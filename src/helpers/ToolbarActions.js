import mrEmitter from '../helpers/mrEmitter'
import SettingsHandler from '../helpers/SettingsHandler'

/**
* This class contains helpers for toolbar actions
*/
class InternalToolbarActions {

  // filter the selected tableData
  filterSelected = (data) => !!data.selected

  // restart the download process for a file
  onRedownloadFile = (tableData) => {
    // send the file to be downloaded again
    mrEmitter.emit('onRedownloadFile', tableData.filter(this.filterSelected)[0])
    // now close the toolbar
    mrEmitter.emit('onCloseToolbar')
  }

  // display detailed info about file / files
  onRequestFileInfo = (tableData) => {
    tableData = tableData.filter(this.filterSelected)
    let sendData = {
      files: 0,
      size: 0,
      downloaded: 0,
      fileName: '',
      lastTry: 0
    }
    for (let cData of tableData) {
      sendData.files++
      sendData.size += cData.size
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

  /**
  * [clear list and update the items in it]
  * @method
  * @param  {String}  tableData  [the original data]
  * @param  {Boolean} confirm    [if true the toast to undo will be shown]
  * @return {Event}
  */
  onRemoveFromList = (tableData) => {
    const listData = tableData.filter(this.filterSelected)
    let updateData = []
    // go through the whole data to match the ones with the selected one's uuid and add them to the updateData array
    for (let cData of stored.dldata.data) {
      for (let lData of listData) {
        if (lData.uuid === cData.uuid) {
          break
        }
        else {
          updateData.push(cData)
        }
      }
    }
    // emit the event that the items are cleared from the list
    mrEmitter.emit('onClearList', listData.length, stored.dldata.data)
    // update the item in storage
    settingsHandle.setStored('dldata', updateData)
    // emit event with the new data
    mrEmitter.emit('onUpdateData', updateData)
    // now close the toolbar
    mrEmitter.emit('onCloseToolbar')
  }

  onDeleteFromDisk = (tableData) => {
    mrEmitter.emit('onDeleteFromDisk', tableData)
  }
}

const ToolbarActions = new InternalToolbarActions(),
settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

export default ToolbarActions
