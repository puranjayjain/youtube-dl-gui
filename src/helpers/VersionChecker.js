import SettingsHandler from '../helpers/SettingsHandler'
import YtdlUpdater from '../helpers/YtdlUpdater'
import {ErrorData, SuccessData} from '../Data/Messagedata'
import mrEmitter from '../helpers/mrEmitter'
import moment from 'moment'

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored,
ytdlUpdate

class InternalVersionChecker {
  checkVersion = (forced = false) => {
    // check if to update flag was set, if yes then execute the replacing procedure
    if (stored.youtubedl.data.toUpdate) {
      this.replaceFile()
      return
    }
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

  // replace file if toUpdate flag was set
  replaceFile = () => {
    // REVIEW wait for all modules to load and then try to update
    // a better solution can be there I am just not there ... yet
    setTimeout(() => {
      // delete the exe file
      fs.unlink(path.join(stored.youtubedl.data.path, 'youtube-dl.exe'), (err) => {
        if (err) {
          throw err
          // show the error in toast
          mrEmitter.emit('onShowError', ErrorData.couldntDeleteYtdl)
          return
        }
        // then remove .temp extension
        fs.rename(path.join(stored.youtubedl.data.path, 'youtube-dl.exe.temp'), path.join(stored.youtubedl.data.path, 'youtube-dl.exe'), (err) => {
          if (err) {
            throw err
            // show the error in toast
            mrEmitter.emit('onShowError', ErrorData.couldntRenameYtdl)
            return
          }
          // if successful, do the necessary changes
          settingsHandle.updateStores('youtubedl', {
            toUpdate: false
          })
          // show successfully updated toast
          mrEmitter.emit('onShowError', SuccessData.updateYtdl)
        })
      })
    }, 2000)
  }
}

const VersionChecker = new InternalVersionChecker()
export default VersionChecker
