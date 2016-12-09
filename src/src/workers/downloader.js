// contains the logic to run a ytdl downloader in the background.
// A bonus of multithreading and a faster performance yippy!

var fs = require('fs'),
  youtubedl = require('youtube-dl'),
  video,
  main = function (dirname) {
    video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      {
        cwd: dirname
      });

    // Will be called when the download starts.
    video.on('info', function (info) {
      process.send('Download started');
      process.send('filename: ' + info.filename);
      process.send('size: ' + info.size);
    });
    
    process.send(video.pipe(fs.createWriteStream('myvideo.mp4')));

    video.on('error', function (e) {
      process.send(e);
    });
  }


process.on('error', (m) => {
  process.send(e);
});

process.on('message', (dirname) => {
  main(dirname);
});