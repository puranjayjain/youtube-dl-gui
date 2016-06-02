// main logic for starting up youtube dl resides here
import SettingsHandler from './SettingsHandler'

import mrEmitter from './mrEmitter'

let stored = {}

let settingsHandle = new SettingsHandler()

// video download object
let _video

export default class Dl {
  constructor(args = {
    uuid,
    url,
    filepath
  }) {
    this._args = args
      // load all the settings
    stored = SettingsHandler.stored
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
        [],
        // Additional options can be given for calling `child_process.execFile()`.
        // TODO replace dirname with the actual path this._args.filepath
        {
          cwd: dirname
        })
      // initiate the download status monitors here
    _video.on('info', (info) => {
      // emits on download start / resume to update the useful stuff
      mrEmitter.emit('onStartStatus', this._args.uuid, info)
    })
    // start the download here
    _video.pipe(fs.createWriteStream('thevideo.mp4'))

    _video.on('data', (chunk) => {
      // TODO console.log('got %d bytes of data', chunk.length)
      // the other end of this will read the chunk.length for new download size addition
      // TODO update the other end's time and date with moment()
      mrEmitter.emit('onDownloadStatus', this._args.uuid, chunk)
    })

    return _video
  }

  // all the main functions to proppogate tasks
  resumeDownload = () => {
    return _video.resume()
  }

  pauseDownload = () => {
    return _video.pause()
  }

  // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112
  stopDownload = () => {
    this.pauseDownload()
    return _video.unpipe()
  }
}
