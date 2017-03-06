// contains the logic to run a ytdl downloader in the background.
// A bonus of multithreading and a faster performance yippy!

// main class for the downloader logic
let fs = require('fs'),
    path = require('path'),
    youtubedl = require('youtube-dl'),
    download,
    video,
    info,
    // the original filename
    filename = ''

class Dl {
    /*
  args = {
  index: 1,
  url,
  filePath,
  dirname,
  format,
  start: 0,
  username,
  password,
  workarounds
}
*/
    constructor(args) {
        this.args = Object.assign({}, args)
    }

    // getters and setters
    get filename() {
        return filename
    }

    set filename(value) {
        filename = value
    }

    getArgs() {
        return this.args
    }

    setArgs(value) {
        this.args = Object.assign({}, value)
    }

    // class functions or prototypes
    // returns all the arguments that need to be passed for youtube-dl
    getArgs() {
        let args = []
        // calculate it by default and leave it if no format is chosen (node youtubedl handles for best on it's own)
        // check and push format
        if (this.args.format) {
            args.push('-f', this.args.format)
        }
        // authentication
        if (this.args.username && this.args.password) {
            args.push('-u', this.args.username, '-p', this.args.password)
        }
        // copy workarounds to the args
        let workarounds = Object.assign({}, this.args.workarounds)
        for (let workaround in workarounds) {
            // if not a header
            if (workaround === 'header') {
                let headers = workarounds[workaround].split(',')
                for (let header of headers) {
                    args.push('--add-header', header)
                }
            } else {
                args.push(`--${workaround.replace('_','-')}`, workarounds[workaround])
            }
        }
        return args
    }

    infoDownload() {
        info = youtubedl.getInfo(
            this.args.url,
            this.getArgs(),
            (err, info) => {
                if (err) throw sendError(err)
                sendMessage({
                    type: 'info',
                    index: this.args.index,
                    message: info
                })
            })
    }

    // initiate the ytdl exe
    initDownload() {
        video = youtubedl(
            this.args.url,
            this.getArgs(),
            // Additional options can be given for calling `child_process.execFile()`.
            {
                // add checks for resuming a partially downloaded file
                start: this.args.start ? this.args.start : 0,
                cwd: this.args.dirname
            })

        video.pipe(fs.createWriteStream(filename))

        // update on each downloaded chunk
        // the other end of this will read the message for new download size addition
        video.on('data', (chunk) => sendMessage({
            type: 'data',
            index: this.args.index,
            message: chunk.length
        }))

        // update the data on download end, error, cancel
        // send the error back
        video.on('error', (e) => sendError(e))

        // Will be called if download was already completed and there is nothing more to download.
        video.on('complete', () => sendMessage({
            index: this.args.index,
            type: 'complete'
        }))

        // download has been completed
        video.on('end', () => {
            // TODO rename the file if needed

            // tell the gui we are done
            sendMessage({
                index: this.args.index,
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

    testDownload() {
        // console.log(path.join(this.args.filePath, filename));
        sendMessage({
            more: filename,
            val: this.args,
            index: this.args.filePath,
            type: 'test'
        })
    }

    // all the main functions to proppogate tasks
    resumeDownload() {
        video.resume()
        sendMessage({
            index: this.args.index,
            type: 'resume'
        })
    }

    pauseDownload() {
        video.pause()
        sendMessage({
            index: this.args.index,
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
        index: this.args.index,
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
    if (message.type === 'info') {
        download = new Dl(message.args)
        download[`${message.type}Download`]()
    } else if (message.type === 'setter') {
        //  TODO update the file name also from here
        if (message.dataKey === 'filename') {
            download[message.dataKey] = message.dataValue
        } else {
            download.setArgs(message.dataValue)
        }
    } else if (message.type === 'getter') {
        let value
        if (message.dataKey === 'filename') {
            value = download[message.dataKey]
        } else {
            value = Object.assign({}, download.getArgs())
        }
        // send back the data
        sendMessage({
            type: 'getter',
            message: value
        })
    } else {
        download[`${message.type}Download`]()
    }
})