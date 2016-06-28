// loads and stores all the settings i.e provides an interface to saved settings

// the settings loader helper
import Storage from '../helpers/Storage'
import mrEmitter from '../helpers/mrEmitter'

let stored = {
  data: [],
  theme: {},
  download: {},
  filesystem: {},
  workarounds: {},
  desktop: {},
  youtubedl: {},
  hashidcount: 0
}

export default class SettingsHandler {
  //  initiate all the settings here
  constructor() {
    // initiate all the settings from storage here in order of being displayed
    // NOTE - are lower camel cased e.g dark-theme becomes darkTheme
    // see https://en.wikipedia.org/wiki/CamelCase
    // theme settings
    stored.theme.darkTheme = new Storage('darkTheme', true)
    // Download Options
    stored.download.retries = new Storage('retries', 10)
    stored.download.rate_limit = new Storage('rate-limit', '')
    // File Options
    stored.filesystem.destination = new Storage('destination', '')
    // Workarounds
    stored.workarounds.encoding = new Storage('encoding', '')
    stored.workarounds.no_check_certificate = new Storage('no-check-certificate', false)
    stored.workarounds.prefer_insecure = new Storage('prefer-insecure', false)
    stored.workarounds.user_agent = new Storage('user-agent', '')
    stored.workarounds.referer = new Storage('referer', '')
    stored.workarounds.add_header = new Storage('add-header', '')
    // desktop options
    stored.desktop.status = new Storage('status', true)
    // also initiate the settings that are not being displayed
    // data about the downloaded files and te files being downloaded
    stored.dldata = new Storage('dldata', [], true)
    // also include the youtubedl version
    stored.youtubedl = new Storage('youtubedl', {version: 0, lasttried: -1, published_at: -1, path: '', toUpdate: false})
    // also include current hashid count
    stored.hashidcount = new Storage('hashidcount', 0)
  }

  // load youtubedl version
  loadYtdlVersion = () => {
    youtubedl.exec('', ['--version'], {}, (err, output) => {
      if (err) {
        throw err
        return
      }
      let ytdl = stored.youtubedl.data
      ytdl.version = output[0]
      // update the item in storage
      this.setStored('youtubedl', ytdl)
    })
  }

  /*
  * getters and setter are defined here
  */
  get stored() {
    return stored
  }

  set stored(value) {
    stored = value
  }

  /**
  * [update a data item in dlData]
  * @method
  * @param  {String} hashid [to identify the item]
  * @param  {key}   item [object's key]
  * @param  {value} data [object's value]
  * @return {mrEmitter}
  */
  updateDlDataItem = (hashid, item, data) => {
    let updateData = stored.dldata.data
    for (let cData of updateData) {
      if (cData.hashid === hashid) {
        cData[item] = data
      }
    }
    // update the item in storage
    this.setStored('dldata', updateData)
    // emit updated data
    mrEmitter.emit('onUpdateData', updateData)
  }

  /**
  * [update multiple storage objects of a stored]
  * @method
  * @param  {String} key  [the identifying key]
  * @param  {Object} data [object contains the updated key value pair]
  */
  updateStores = (key, data) => {
    let updateData = stored[key].data
    for (let i in data) {
      // check if it is not a prototype
      if (data.hasOwnProperty(i)) {
        updateData[i] = data[i]
      }
    }
    // forward data to set stored method to finally store it back
    this.setStored(key, updateData)
  }

  // set a particular storage data
  setStored = (key, value) => {
    stored[key].data = value
  }
}
