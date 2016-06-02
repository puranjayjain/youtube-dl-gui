'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// main logic for starting up youtube dl resides here
var fs = require('fs');
var youtubedl = require('youtube-dl');

// import SettingsHandler from './SettingsHandler'

// let stored = {}

// let settingsHandle = new SettingsHandler()

// video download object
var _video = void 0;

var Dl = function () {
  function Dl() {
    var _this = this;

    var args = arguments.length <= 0 || arguments[0] === undefined ? {
      uuid: uuid,
      url: url,
      filepath: filepath
    } : arguments[0];

    _classCallCheck(this, Dl);

    this.initVideo = function () {
      _video = youtubedl(_this._args.url,
      // TODO leaving the formats to empty for now, get them calculated from the settings
      [],
      // Additional options can be given for calling `child_process.execFile()`.
      // TODO replace dirname with the actual path this._args.filepath
      {
        cwd: __dirname
      });
      // initiate the download status monitors here
      _video.on('info', function (info) {
        // emits on download start / resume to update the useful stuff
        mrEmitter.emit('onStartStatus', _this._args.uuid, info);
      });
      // start the download here
      _video.pipe(fs.createWriteStream('thevideo.mp4'));

      _video.on('data', function (chunk) {
        // TODO console.log('got %d bytes of data', chunk.length)
        // the other end of this will read the chunk.length for new download size addition
        // TODO update the other end's time and date with moment()
        mrEmitter.emit('onDownloadStatus', _this._args.uuid, chunk);
      });

      return _video;
    };

    this.resumeDownload = function () {
      return _video.resume();
    };

    this.pauseDownload = function () {
      return _video.pause();
    };

    this.stopDownload = function () {
      _this.pauseDownload();
      return _video.unpipe();
    };

    this._args = args;
    // load all the settings
    stored = SettingsHandler.stored;
  }

  // all the getters and setters are declared here https://github.com/fent/node-youtube-dl/issues/112

  _createClass(Dl, [{
    key: 'video',
    get: function get() {
      return _video;
    }

    // instantiate functions
    // TODO add checks for resuming a partially downloaded file
    // start te process and get the video also

    // all the main functions to proppogate tasks

    // REVIEW this after this is resolved https://github.com/fent/node-youtube-dl/issues/112

  }]);

  return Dl;
}();

exports.default = Dl;
