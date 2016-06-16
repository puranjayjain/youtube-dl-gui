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
    uuid,
    url,
    filePath,
    start: 0,
    fullPath: false
  }) {
    this._args = args
      // load all the settings
    stored = settingsHandle.stored
  }

  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112
  get video() {
    return _video
  }

  // instantiate functions
  // TODO add checks for resuming a partially downloaded file
  // start te process and get the video also
  initVideo = () => {
    _video = youtubedl(
        this._args.url,
        // TODO leaving the formats to empty for now, get them calculated from the settings
        // FIXME calculate it by default and leave it if no format is chosen (node youtubedl handles for best on it's own)
        [],
        // Additional options can be given for calling `child_process.execFile()`.
        {
          start: this._args.start,
          cwd: dirname
        })

    // initiate the download status monitors here
    _video.on('info', (info) => {
      // create a copy of the data
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.uuid === this._args.uuid) {
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
        if (cData.uuid === this._args.uuid) {
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

    // also add events for stream paused, resumed, etc.
    // TODO implement these events from the tables
    // _video.on('pause', () => {
    //   console.info('pause')
    // })
    // _video.on('resume', () => {
      // console.info('resume')
    // })

    // update the data on download end, error, cancel
    _video.on('error', (e) => {
      // throw the error
      console.error(e)
      // the other end of this will read the chunk.length for new download size addition
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.uuid === this._args.uuid) {
          cData.status = 'Error'
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // update the ui state
      mrEmitter.emit('onUpdateData', updateData)
    })

    _video.on('close', () => {
      console.info('close: ')
    })

    // download has been completed
    _video.on('end', () => {
      // the other end of this will read the chunk.length for new download size addition
      let updateData = stored.dldata.data
      // try to find it in tableData if not add it
      for (let cData of updateData) {
        if (cData.uuid === this._args.uuid) {
          cData.status = 'Done'
          break
        }
      }
      // update the stored data
      settingsHandle.setStored('dldata', updateData)
      // update the ui state
      mrEmitter.emit('onUpdateData', updateData)
    })

    // start the download here
    // TODO replace thevideomp4 with the one which we get from youtube
    let downloadPath
    if (this._args.fullPath) {
      downloadPath = this._args.filePath
    }
    else {
      downloadPath = path.join(this._args.filePath.toString(), 'thevideo.mp4')
    }
    _video.pipe(fs.createWriteStream(downloadPath))
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
