// contains the logic to run a ytdl downloader in the background.
// A bonus of multithreading and a faster performance yippy!

// main class for the downloader logic does the orchestrating
let fs = require('fs'),
  path = require('path'),
  youtubedl = require('youtube-dl'),
  download,
  video,
  // the original filename
  filename = ''

class Dl {
  /*
  args = {
  url,
  filePath,
  dirname,
  format
  start: 0,
    username,
    password,
    workarounds
} 
*/
  constructor(args) {
    this.args = Object.assign({}, args)
      // initiate the downloader
    this._initYTDL()
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
      args.push('-u', this.args.username, '-p', this.args.password)
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

  // initiate the ytdl exe
  _initYTDL() {
    video = youtubedl(
      this.args.url,
      this.getArgs(),
      // Additional options can be given for calling `child_process.execFile()`.
      {
        // add checks for resuming a partially downloaded file
        // start: this.args.start,
        cwd: this.args.dirname
      })

    // initiate the download status monitors here
    video.on('info', (info) => {
      sendMessage({
        type: 'info',
        message: info
      })
    })

    // update on each downloaded chunk
    // the other end of this will read the message for new download size addition
    video.on('data', (chunk) => sendMessage({
      type: 'data',
      message: chunk.length
    }))

    // update the data on download end, error, cancel
    // send the error back
    video.on('error', (e) => sendError(e))

    // Will be called if download was already completed and there is nothing more to download.
    video.on('complete', () => sendMessage({
      type: 'complete'
    }))

    // download has been completed
    video.on('end', () => {
      // TODO rename the file if needed

      // tell the gui we are done
      sendMessage({
        type: 'end'
      })
    })
  }

  // start the download here
  startDownload() {
    // TODO changes for resuming partially downloaded file
    // REVIEW you can also specify start here
    video.pipe(fs.createWriteStream(path.join(this.args.filePath, filename)))
  }

  // all the main functions to proppogate tasks
  resumeDownload() {
    video.resume()
    sendMessage({
      type: 'resume'
    })
  }

  pauseDownload() {
    video.pause()
    sendMessage({
      type: 'pause'
    })
  }

  // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112
  stopDownload() {
    this.pauseDownload()
      // TODO also close down the child_process
    sendMessage({
      type: 'stop',
      message: video.unpipe()
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

// send back errors and exits
process.on('close', (e) => sendError(e))
process.on('error', (e) => sendError(e))
process.on('exit', (e) => sendError(e))

// receive messages from the gui and act accordinglys
process.on('message', (message) => {
  // either init or a command
  if(message.type === 'init') {
    download = new Dl(message.args)
  } else {
    download[`${message.type}Download`]()
  }
})