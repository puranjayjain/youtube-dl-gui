// updates the ytdl binary on demand
import SettingsHandler from '../helpers/SettingsHandler'
import moment from 'moment'

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

export default class YtdlUpdater {
  constructor(published_at, url) {
    // TODO if the new published_at is new stop all downloads and then update ytdl
    // copy args
    this.published_at = published_at
    this.url = url
    // set partial to true and updating to true so the downloading is being done is told
    // update checking time
    // let ytdl = stored.youtubedl.data
    // TODO update tried and published_at after successful update to new version
    // ytdl.published_at = this.published_at
    // ytdl.lasttried = moment()

    // update the stored data
    // settingsHandle.setStored('youtubedl', ytdl)
  }

  startUpdateExe = () => {
    which('youtube-dl', (err, resolvedPath) => {
      // err is returned if no "exe" is found on the PATH
      // if it is found, then the absolute path to the exec is returned
      if (err) throw err

      let pathToExe = resolvedPath.slice(0, resolvedPath.lastIndexOf('\\') - resolvedPath.length + 1)
      
    })
  }
}
