// main logic for starting up youtube dl resides here
import moment from 'moment'

import SettingsHandler from './SettingsHandler'
import mrEmitter from './mrEmitter'

let settingsHandle = new SettingsHandler(),
stored = {},
// video download object
_video

export default class Dl {
  constructor(args = {
    hashid,
    url,
    filePath,
    format,
    start: 0,
    username,
    password
  }) {
    this._args = args
      // load all the settings
    stored = settingsHandle.stored
  }

  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112
  get video() {
    return _video
  }

  // returns all the arguments that need to be passed for youtube-dl
  getArgs = () => {
    let args = []
    // calculate it by default and leave it if no format is chosen (node youtubedl handles for best on it's own)
    // check and push format
    if (this._args.format) {
      args.push('-f', this._args.format)
    }
    // authentication
    if (this._args.username && this._args.password) {
      args.push('--u', this._args.username, '--p', this._args.password)
    }
    // workarounds
    if (stored.workarounds.encoding.data) {
      args.push('--encoding', stored.workarounds.encoding.data)
    }
    if (stored.workarounds.no_check_certificate.data) {
      args.push('--no-check-certificate', stored.workarounds.no_check_certificate.data)
    }
    if (stored.workarounds.prefer_insecure.data) {
      args.push('--prefer-insecure', stored.workarounds.prefer_insecure.data)
    }
    if (stored.workarounds.user_agent.data) {
      args.push('--user-agent', stored.workarounds.user_agent.data)
    }
    if (stored.workarounds.add_header.data) {
      let headers = stored.workarounds.add_header.data.split(',')
      for (let header of headers) {
        args.push('--add-header', header)
      }
    }
    return args
  }

  // instantiate functions
  // start te process and get the video also
  initVideo = () => {
    _video = youtubedl(
        this._args.url,
        this.getArgs(),
        // Additional options can be given for calling `child_process.execFile()`.
        {
          // add checks for resuming a partially downloaded file
          start: this._args.start,
          cwd: dirname
        })

    // initiate the download status monitors here
    _video.on('info', (info) => {
      // create a copy of the data
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.hashid === this._args.hashid) {
          cData.size = info.size
          cData.format_id = info.format_id
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // emits on download start / resume to update the useful stuff
      mrEmitter.emit('onUpdateData', updateData)
    })

    // update on each downloaded chunk
    _video.on('data', (chunk) => {
      // the other end of this will read the chunk.length for new download size addition
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.hashid === this._args.hashid) {
          cData.downloaded += chunk.length
          cData.status = 'Downloading'
          cData.lastTry = moment()
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // update the ui state
      mrEmitter.emit('onUpdateData', updateData)
    })

    // update the data on download end, error, cancel
    _video.on('error', (e) => {
      // throw the error
      console.error(e)
      // the other end of this will read the chunk.length for new download size addition
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.hashid === this._args.hashid) {
          cData.status = 'Error'
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // update the ui state
      mrEmitter.emit('onUpdateData', updateData)
      // remove the download process
      mrEmitter.emit('onRemoveDownloadProcess', this._args.hashid)
    })

    // download has been completed
    _video.on('end', () => {
      // the other end of this will read the chunk.length for new download size addition
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.hashid === this._args.hashid) {
          cData.status = 'Done'
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // update the ui state
      mrEmitter.emit('onUpdateData', updateData)
      // remove the download process
      mrEmitter.emit('onRemoveDownloadProcess', this._args.hashid)
    })

    // start the download here
    _video.pipe(fs.createWriteStream(this._args.filePath))
  }

  // all the main functions to proppogate tasks
  resumeDownload = () => _video.resume()

  pauseDownload = () => _video.pause()

  // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112
  stopDownload = () => {
    this.pauseDownload()
    return _video.unpipe()
  }
}
