// a web worker instance of this file which will be used for interaction with node youtube dl
importScripts('../require.js')

// import fs from 'fs'
// import youtubedl from 'youtube-dl'

// onmessage = (e) => {
//   console.log('Message received from main script')
//   postMessage('yolo' + e.data)
// }

require({
    baseUrl: './'
  }, ['require', 'fs', 'youtube-dl'],
  (require, fs, youtubedl) => {
    postMessage('yolo' + e.data)
  }
)
