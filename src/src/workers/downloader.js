// contains the logic to run a ytdl downloader in the background.
// A bonus of multithreading and a faster performance yippy!

// main class for the downloader logic does the orchestrating
let fs = require('fs'),
  youtubedl = require('youtube-dl'),
  download

class Dl {
  constructor(args = {
    url,
    filePath,
    dirname,
    format,
    start: 0,
    username,
    password,
    workarounds
  }) {
    this.args = args
    // create video var
    this.video = ''
  }

  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112
  get video() {
    return this.video
  }

  // returns all the arguments that need to be passed for youtube-dl
  getArgs() {
    let args = []
      // calculate it by default and leave it if no format is chosen (node youtubedl handles for best on it's own)
      // check and push format
    if(this.args.format) {
      args.push('-f', this.args.format)
    }
    // authentication
    if(this.args.username && this.args.password) {
      args.push('--u', this.args.username, '--p', this.args.password)
    }
    // copy workarounds to the args
    let workarounds = Object.assign({}, this.args.workarounds)
    for(let workaround in workarounds) {
      // if not a header
      if(workaround === 'header') {
        let headers = workarounds[workaround].split(',')
        for(let header of headers) {
          args.push('--add-header', header)
        }
      } else {
        args.push(`--${workaround.replace('_','-')}`, workarounds[workaround])
      }
    }
    return args
  }

  // instantiate functions
  // start te process and get the video also
  startDowload() {
    this.video = youtubedl(
      this.args.url,
      this.getArgs(),
      // Additional options can be given for calling `child_process.execFile()`.
      {
        // add checks for resuming a partially downloaded file
        start: this.args.start,
        cwd: this.args.dirname
      })

    // initiate the download status monitors here
    this.video.on('info', (info) => sendMessage({
      type: 'info',
      message: info
    }))

    // update on each downloaded chunk
    // the other end of this will read the message for new download size addition
    this.video.on('data', (chunk) => sendMessage({
      type: 'data',
      message: chunk.length
    }))

    // update the data on download end, error, cancel
    // send the error back
    this.video.on('error', (e) => sendError(e))

    // download has been completed
    this.video.on('end', () => sendMessage({
      type: 'end'
    }))

    // start the download here
    this.video.pipe(fs.createWriteStream(this.args.filePath))
  }

  // all the main functions to proppogate tasks
  resumeDownload() {
    this.video.resume()
    sendMessage({
      type: 'resume'
    })
  }

  pauseDownload() {
    this.video.pause()
    sendMessage({
      type: 'pause'
    })
  }

  // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112
  stopDownload() {
    this.pauseDownload()
    sendMessage({
      type: 'stop',
      message: this.video.unpipe()
    })
  }
}

//  send thread error back to the main program to investigate
function sendError(e) {
  sendMessage({
    type: 'error',
    message: e
  })
}

// pass messages to gui
function sendMessage(m) {
  process.send(m)
}

// receive messages from the gui and act accordinglys
process.on('message', (message) => {
  // either init or a command
  if(message.type === 'init') {
    download = new Dl(message.args)
  } else {
    download[message.type]()
  }
})