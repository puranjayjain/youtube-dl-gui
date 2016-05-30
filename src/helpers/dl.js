// main logic for starting up youtube dl resides here
const fs = window.require('fs')
const youtubedl = window.require('youtube-dl')

import mrEmitter from './mrEmitter'
import SettingsHandler from './SettingsHandler'

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
      // call initiating functions here
    this.initVideo()
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
        {
          cwd: this._args.filepath
        })
      // initiate the download status monitors here
    _video.on('info', (info) => {
      console.log(info)
      // emits on download start / resume to update the useful stuff
      mrEmitter.emit('onStartStatus', this._args.uuid, info)
    })
    _video.on('data', (chunk) => {
      // TODO console.log('got %d bytes of data', chunk.length)
      // the other end of this will read the chunk.length for new download size addition
      // TODO update the other end's time and date with moment()
      mrEmitter.emit('onDownloadStatus', this._args.uuid, chunk)
    })
  }


  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112
  get video() {
    return _video
  }

  get download() {
      // TODO replace the filename and get it calculated from ytdl!!!
      return _video.pipe(fs.createWriteStream('thevideo.mp4'))
    }
    // all the main functions to proppogate tasks
  resumeDownload = () => {
    _video.resume()
  }

  pauseDownload = () => {
    _video.pause()
  }

  // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112
  stopDownload = () => {
    this.pauseDownload()
    _video.unpipe()
  }
}
