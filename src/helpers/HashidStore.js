// hash id generator
import Hashids from 'hashids'
import SettingsHandler from '../helpers/SettingsHandler'

const HashidStore = new Hashids('youtube-dl gui store')

let settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

const getHashid = () => {
  let hashidcount = stored.hashidcount.data,
  hash = HashidStore.encode(hashidcount++)
  settingsHandle.setStored('hashidcount', hashidcount)
  return hash
}

export default getHashid
