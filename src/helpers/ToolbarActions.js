import mrEmitter from '../helpers/mrEmitter'
import SettingsHandler from '../helpers/SettingsHandler'

/**
* This class contains helpers for toolbar actions
*/
class InternalToolbarActions {
  // display detailed info about file / files
  onRequestFileInfo = (tableData) => {
    let sendData = {
      files: 0,
      downloaded: 0,
      fileName: '',
      lastTry: 0
    }
    for (let cData of tableData) {
      sendData.files++
      sendData.downloaded += cData.downloaded
      sendData.fileName = cData.fileName
      sendData.lastTry = cData.lastTry
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
