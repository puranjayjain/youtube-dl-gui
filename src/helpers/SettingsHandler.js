// loads and stores all the settings i.e provides an interface to saved settings

// the settings loader helper
import Storage from '../helpers/Storage'

let stored = {
  data: [],
  theme: {},
  download: {},
  filesystem: {},
  desktop: {}
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
    stored.download.bufferSize = new Storage('bufferSize', 1024)
    // File Options
    stored.filesystem.id = new Storage('id', false)
    stored.filesystem.output = new Storage('output', 'default')
    stored.filesystem.restrict = new Storage('restrict', false)
    // desktop options
    stored.desktop.status = new Storage('status', true)
    // also initiate the settings that are not being displayed
    // data about the downloaded files and te files being downloaded
    stored.dldata = new Storage('dldata', [], true)
  }

  // getters and setter are defined here
  get stored() {
    return stored
  }

  set stored(value) {
    stored = value
  }

  // set a particular storage data
  setStored = (key, value) => {
    stored[key].data = value
  }
}
