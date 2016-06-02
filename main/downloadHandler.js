// controls the youtube-dl Module to download or pause or cancel or show it's status
const {
  ipcMain
} = require('electron')
// const Dl = require('./Dl')
let dlWorkers = []

const fs = require('fs')
const youtubedl = require('youtube-dl')
let video

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
    // if download start then start it
  if(arg === 'download') {
    // dlWorkers.push(new Dl({
    //
    // }))
     video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      {
        cwd: 'C:\Users\Puranjay\Documents\Youtube-dl-gui'
      });

    // Will be called when the download starts.
    video.on('info', function (info) {
      console.log('Download started');
      console.log('filename: ' + info.filename);
      console.log('size: ' + info.size);
    });

    video.pipe(fs.createWriteStream('myvideo.mp4'));
  }
})
