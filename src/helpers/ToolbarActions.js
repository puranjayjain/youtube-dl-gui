import mrEmitter from '../helpers/mrEmitter'
import SettingsHandler from '../helpers/SettingsHandler'

/**
* This class contains helpers for toolbar actions
*/
class InternalToolbarActions {
  constructor() {

  }

  // display detailed info about file / files
  onRequestFileInfo = (...uuid) => {
    let sendData = {
      files: 0,
      downloaded: 0,
      fileName: ''
    }
    for (cUuid of uuid) {
      for (cData of stored) {
        if (cData.uuid === cUuid) {
          sendData.files++
          sendData.downloaded += cData.downloaded
          sendData.fileName = cData.fileName
        }
      }
    }
    // emit according to no of files
    if (sendData.files > 1) {
      mrEmitter.emit('onRequestFileInfo', sendData)
    }
    else {
      mrEmitter.emit('onRequestSingleFileInfo', sendData)
    }
  }
}

const ToolbarActions = new InternalToolbarActions(),
settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

export default ToolbarActions
