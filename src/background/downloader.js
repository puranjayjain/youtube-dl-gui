// a web worker instance of this file which will be used for interaction with node youtube dl

import fs from 'fs'
import youtubedl from 'youtube-dl'

module.exports = (self) => {
  self.addEventListener('message', (ev) => {
    const startNum = parseInt(ev.data) // ev.data=4 from main.js

    setInterval(() => {
      let r = startNum / Math.random() - 1
      self.postMessage([startNum, r])
    }, 1000)
  })
}
