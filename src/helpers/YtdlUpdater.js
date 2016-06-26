// updates the ytdl binary on demand
import SettingsHandler from '../helpers/SettingsHandler'
import moment from 'moment'

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored,
ytdlProcess

export default class YtdlUpdater {
  constructor(published_at, url) {
    // start updating
    startUpdateExe(published_at, url)
  }

  startUpdateExe = (published_at, url) => {
    which('youtube-dl', (err, resolvedPath) => {
      // err is returned if no "exe" is found on the PATH
      // if it is found, then the absolute path to the exec is returned
      if (err) {
        throw err
        return
      }

      let pathToExe = resolvedPath.slice(0, resolvedPath.lastIndexOf('\\') - resolvedPath.length + 1),
      fileName = 'youtube-dl.exe.mtd',
      filePath = path.join(pathToExe, fileName)

      // start download of youtube-dl
      wget({
        url:  url,
        dest: filePath,      // destination path or path with filenname, default is ./
        timeout: 10000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
      }, (error, response, body) => {
        if (error) {
          console.log('--- error:')
          console.log(error)            // error encountered
        } else {
          // update the stored data
          settingsHandle.updateStores('youtubedl', {
            published_at: published_at,
            lasttried: moment()
          })
          // TODO if the new published_at is new stop all downloads and then update ytdl
        }
      }
    )
  })
}
}
