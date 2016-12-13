let fs = require('fs'),
  os = require('os'),
  path = require('path'),
  moment = require('moment'),
  wget = require('wget-improved'),
  platform = os.platform(),
  rest = require('rest'),
  properties = {
    method: 'GET',
    path: 'https://api.github.com/repos/rg3/youtube-dl/releases/latest',
    headers: {
      // https://developer.github.com/v3/
      'Accept': 'application/vnd.github.v3+json',
      // HACK https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent
      'User-Agent': ''
    }
  },
  dirname = '',
  download,
  // initial version release to match against
  initVersion = '';

// check for latest release
function checkOnlineVersion() {
  rest(properties)
    .then((response) => {
      try {
        runUpdateIfNecessary(JSON.parse(response.entity));
      } catch(e) {
        sendError(response.entity);
      }
    })
    .catch((err) => {
      sendError(err);
    });
}

function getAsset(assets, name) {
  let retAsset = '';
  for(let asset of assets) {
    if(asset.name === name) {
      retAsset = asset.browser_download_url;
    }
  }
  return retAsset;
}

// use version and update if necessary
function runUpdateIfNecessary(info) {
  let filename = 'youtube-dl',
    toUpdate = true;
  // run update according to the Platform
  // check if windows then add extension
  if(platform === 'win32') {
    filename += '.exe';
  }
  // prepare file path to the new downloaded version
  const dlpath = path.join(dirname, 'node_modules', 'youtube-dl', 'bin', filename + '.temp');
  // check if initial version is set or not
  if(initVersion) {
    // if yes then create a moment out of it
    let initMoment = moment(initVersion),
      newVersion = moment(info.published_at);
    // compare them to see if different
    toUpdate = !!Math.abs(initMoment.diff(newVersion));
  }
  // if we need to update then just do it
  if(toUpdate) {
    // activate the downloader
    download = wget.download(getAsset(info.assets, filename), dlpath, {});
    download.on('error', (err) => {
      sendMessage({
        type: 'dlerror',
        message: err
      });
    });
    download.on('start', (fileSize) => {
      sendMessage({
        type: 'updating',
        message: fileSize
      });
    });
    download.on('end', (output) => {
      // tell the gui to close me and update the published_at as well
      sendMessage({
        type: 'done',
        published_at: info.published_at
      });
    });
  } else {
    // else tell the gui no need!
    sendMessage({
      type: 'latest'
    });
  }
}

// receive messages from the gui and act accordingly
process.on('message', (message) => {
  if(message.type === 'start') {
    initVersion = message.version;
    dirname = message.dirname;
    properties.headers['User-Agent'] = message.userAgent;
    sendMessage(properties);
    checkOnlineVersion();
  }
});

//  send thread error back to the main program to investigate
function sendError(e) {
  sendMessage({
    type: 'error',
    message: e
  });
}

// pass messages to gui
function sendMessage(m) {
  process.send(m);
}

// send back errors and exits
process.on('close', (e) => sendError(e));
process.on('error', (e) => sendError(e));
process.on('exit', (e) => sendError(e));