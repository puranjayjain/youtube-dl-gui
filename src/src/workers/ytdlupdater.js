let rest = require('rest'),
  properties = {
    method: 'GET',
    path: 'https://api.github.com/repos/rg3/youtube-dl/releases/latest',
    headers: {
      // https://developer.github.com/v3/
      'Accept': 'application/vnd.github.v3+json',
      // HACK https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent
      'User-Agent': (navigator.userAgent ? navigator.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36')
    }
  },
  os = require('os'),
  fs = require('fs'),
  path = require('path'),
  moment = require('moment'),
  wget = require('wget-improved'),
  platform = os.platform(),
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
  let asset = '';
  for(let asset of assets) {
    if(asset.name === name) {
      asset = asset.browser_download_url;
    }
  }
  return asset;
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
    download.on('start', function (fileSize) {
      sendMessage({
        type: 'updating',
        message: fileSize
      });
    });
    download.on('end', function (output) {
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

// receive messages from the gui and act accordinglys
process.on('message', (message) => {
  if(message.type === 'start') {
    initVersion = message.version;
    dirname = message.dirname;
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

var dummy = {
  "url": "https://api.github.com/repos/rg3/youtube-dl/releases/4888720",
  "assets_url": "https://api.github.com/repos/rg3/youtube-dl/releases/4888720/assets",
  "upload_url": "https://uploads.github.com/repos/rg3/youtube-dl/releases/4888720/assets{?name,label}",
  "html_url": "https://github.com/rg3/youtube-dl/releases/tag/2016.12.12",
  "id": 4888720,
  "tag_name": "2016.12.12",
  "target_commitish": "master",
  "name": "youtube-dl 2016.12.12",
  "draft": false,
  "author": {
    "login": "dstftw",
    "id": 1908898,
    "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/dstftw",
    "html_url": "https://github.com/dstftw",
    "followers_url": "https://api.github.com/users/dstftw/followers",
    "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
    "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
    "organizations_url": "https://api.github.com/users/dstftw/orgs",
    "repos_url": "https://api.github.com/users/dstftw/repos",
    "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
    "received_events_url": "https://api.github.com/users/dstftw/received_events",
    "type": "User",
    "site_admin": false
  },
  "prerelease": false,
  "created_at": "2016-12-11T18:45:10Z",
  "published_at": "2016-12-11T18:46:17Z",
  "assets": [{
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804966",
    "id": 2804966,
    "name": "MD5SUMS",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/octet-stream",
    "state": "uploaded",
    "size": 157,
    "download_count": 6,
    "created_at": "2016-12-11T18:46:23Z",
    "updated_at": "2016-12-11T18:46:23Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/MD5SUMS"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804972",
    "id": 2804972,
    "name": "SHA1SUMS",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/octet-stream",
    "state": "uploaded",
    "size": 181,
    "download_count": 2,
    "created_at": "2016-12-11T18:46:36Z",
    "updated_at": "2016-12-11T18:46:36Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/SHA1SUMS"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804970",
    "id": 2804970,
    "name": "SHA2-256SUMS",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/octet-stream",
    "state": "uploaded",
    "size": 253,
    "download_count": 16,
    "created_at": "2016-12-11T18:46:30Z",
    "updated_at": "2016-12-11T18:46:30Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/SHA2-256SUMS"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804964",
    "id": 2804964,
    "name": "SHA2-512SUMS",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/octet-stream",
    "state": "uploaded",
    "size": 445,
    "download_count": 11,
    "created_at": "2016-12-11T18:46:21Z",
    "updated_at": "2016-12-11T18:46:22Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/SHA2-512SUMS"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804962",
    "id": 2804962,
    "name": "youtube-dl",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/octet-stream",
    "state": "uploaded",
    "size": 1405488,
    "download_count": 26323,
    "created_at": "2016-12-11T18:46:18Z",
    "updated_at": "2016-12-11T18:46:20Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804968",
    "id": 2804968,
    "name": "youtube-dl-2016.12.12.tar.gz",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/x-tar",
    "state": "uploaded",
    "size": 2478147,
    "download_count": 10180,
    "created_at": "2016-12-11T18:46:26Z",
    "updated_at": "2016-12-11T18:46:29Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl-2016.12.12.tar.gz"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804965",
    "id": 2804965,
    "name": "youtube-dl-2016.12.12.tar.gz.sig",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/pgp-signature",
    "state": "uploaded",
    "size": 543,
    "download_count": 18,
    "created_at": "2016-12-11T18:46:22Z",
    "updated_at": "2016-12-11T18:46:23Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl-2016.12.12.tar.gz.sig"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804971",
    "id": 2804971,
    "name": "youtube-dl.exe",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/x-msdownload",
    "state": "uploaded",
    "size": 7574245,
    "download_count": 24962,
    "created_at": "2016-12-11T18:46:31Z",
    "updated_at": "2016-12-11T18:46:35Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl.exe"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804967",
    "id": 2804967,
    "name": "youtube-dl.exe.sig",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/pgp-signature",
    "state": "uploaded",
    "size": 543,
    "download_count": 9,
    "created_at": "2016-12-11T18:46:24Z",
    "updated_at": "2016-12-11T18:46:26Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl.exe.sig"
  }, {
    "url": "https://api.github.com/repos/rg3/youtube-dl/releases/assets/2804963",
    "id": 2804963,
    "name": "youtube-dl.sig",
    "label": "",
    "uploader": {
      "login": "dstftw",
      "id": 1908898,
      "avatar_url": "https://avatars.githubusercontent.com/u/1908898?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dstftw",
      "html_url": "https://github.com/dstftw",
      "followers_url": "https://api.github.com/users/dstftw/followers",
      "following_url": "https://api.github.com/users/dstftw/following{/other_user}",
      "gists_url": "https://api.github.com/users/dstftw/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dstftw/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dstftw/subscriptions",
      "organizations_url": "https://api.github.com/users/dstftw/orgs",
      "repos_url": "https://api.github.com/users/dstftw/repos",
      "events_url": "https://api.github.com/users/dstftw/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dstftw/received_events",
      "type": "User",
      "site_admin": false
    },
    "content_type": "application/pgp-signature",
    "state": "uploaded",
    "size": 543,
    "download_count": 23,
    "created_at": "2016-12-11T18:46:20Z",
    "updated_at": "2016-12-11T18:46:21Z",
    "browser_download_url": "https://github.com/rg3/youtube-dl/releases/download/2016.12.12/youtube-dl.sig"
  }],
  "tarball_url": "https://api.github.com/repos/rg3/youtube-dl/tarball/2016.12.12",
  "zipball_url": "https://api.github.com/repos/rg3/youtube-dl/zipball/2016.12.12",
  "body": "Core\n+ [utils] Add common user agents map\n+ [common] Recognize HLS manifests that contain video only formats (#11394)\n\nExtractors\n+ [dplay] Use Safari user agent for HLS (#11418)\n+ [facebook] Detect login required error message\n* [facebook] Improve video selection (#11390)\n+ [canalplus] Add another video id pattern (#11399)\n* [mixcloud] Relax URL regular expression (#11406)\n* [ctvnews] Relax URL regular expression (#11394)\n+ [rte] Capture and output error message (#7746, #10498)\n+ [prosiebensat1] Add support for DASH formats\n* [srgssr] Improve extraction for geo restricted videos (#11089)\n* [rts] Improve extraction for geo restricted videos (#4989)"
}