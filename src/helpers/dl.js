// main logic for starting up youtube dl resides here
const fs = window.require('fs')
const youtubedl = window.require('youtube-dl')

import SettingsHandler from './SettingsHandler'

let stored = {}

let settingsHandle = new SettingsHandler()

// video download object
let video

export default class Dl {
  constructor(args = {
    url,
    filename
  }) {
    this._args = args
    // load all the settings
    stored = SettingsHandler.stored
      // call the instantiate functions here
    initVideo(args)
  }

  // instantiate functions
  // TODO add checks for resuming a partially downloaded file
  initVideo = (args) => {
    video = youtubedl(args.url,
      // Additional options can be given for calling `child_process.execFile()`.
      {
        cwd: __dirname
      })
  }

  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112
  get download() {
    return video.pipe(fs.createWriteStream(this._args))
  }
  // all the main functions to proppogate tasks
  resumeDownload = () => {
    video.resume()
  }

  pauseDownload = () => {
    video.pause()
  }

  // REVIEW this after this is resolved
  stopDownload = () => {
    this.pauseDownload()
    video.unpipe()
  }
}
