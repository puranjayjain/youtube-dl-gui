import SettingsHandler from '../helpers/SettingsHandler'
import YtdlUpdater from '../helpers/YtdlUpdater'
import moment from 'moment'

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored,
ytdlUpdate

class InternalVersionChecker {
  checkVersion = (forced = false) => {
    // if checked today don't do it again unless forced
    if (forced || Math.abs(moment(stored.youtubedl.data.lasttried).diff(moment(), 'days')) > 0) {
      fetch('https://api.github.com/repos/rg3/youtube-dl/releases/latest').then((response) => {
        response.json().then((data) => {
          let ytdl = stored.youtubedl.data
          if (ytdl.version !== data.tag_name) {
            let yUrl, ySize
            // find youtube-dl exe's url ...
            for (let asset of data.assets) {
              if (asset.name === 'youtube-dl.exe') {
                yUrl = asset.browser_download_url
              }
            }
            // ... and pass it
            ytdlUpdate = new YtdlUpdater(data.published_at, yUrl)
          }
          else {
            settingsHandle.updateStores('youtubedl', {
              published_at: data.published_at,
              lasttried: moment()
            })
          }
        })
      }).then((returnedValue) => {
        // return value
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}

const VersionChecker = new InternalVersionChecker()
export default VersionChecker
