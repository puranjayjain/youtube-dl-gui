import SettingsHandler from '../helpers/SettingsHandler'
import moment from 'moment'

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

class InternalVersionChecker {
  constructor() {

  }

  checkVersion = (forced = false) => {
    // if checked today don't do it again unless forced
    if (forced || !Math.abs(moment(stored.youtubedl.lasttried).diff(moment(), 'days'))) {
      fetch('https://api.github.com/repos/rg3/youtube-dl/releases/latest').then((response) => {
        	response.json().then((data) => {
            // copy it into a version var
            const version = data.tag_name,
            lasttried = published_at
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
