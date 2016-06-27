import mrEmitter from '../helpers/mrEmitter'
import SettingsHandler from '../helpers/SettingsHandler'
import Dl from '../helpers/Dl'

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

  // resume download
  onResumeDownload = (tableData, downloadProcesses) => {
    tableData = tableData.filter(this.filterSelected)
    // flag to check if the Data is found in the downloadProcesses list
    let found = false
    for (let cData of tableData) {
      // go through the downloadProcesses
      for (let downloadProcess of downloadProcesses) {
        if (cData.uuid === downloadProcess.uuid) {
          downloadProcess.downloadProcess.resumeDownload()
          found = true
          break
        }
      }
      let updateData = stored.dldata.data
      for (let lData of updateData) {
        if (cData.uuid === lData.uuid) {
          lData.status = 'Downloading'
          // if not found then continue to loop through the entire list
          if (!found) {
            let downloadProcess = new Dl({
              uuid: lData.id,
              url: lData.url,
              filePath: lData.fileName,
              start: lData.downloaded,
              format: ldata.format
            })
            // copy ldata into newDownload
            let newDownload = Object.assign({}, lData)
            // add downloadProcess to new download
            newDownload.downloadProcess = downloadProcess
            // emit download process
            mrEmitter.emit('onStartDownload', newDownload)
            // initialze the download process
            downloadProcess.downloadProcess.initVideo()
          }
        }
      }
      // store it back in the storage
      settingsHandle.setStored('dldata', updateData)
      // emit storage event
      mrEmitter.emit('onUpdateData', updateData)
    }
    // now close the toolbar
    mrEmitter.emit('onCloseToolbar')
  }

  // search for download in downloadProcess and then pause it
  onPauseDownload = (tableData, downloadProcesses) => {
    tableData = tableData.filter(this.filterSelected)
    let found = false,
    cData = tableData[0],
    updateData = stored.dldata.data
    // go through the downloadProcesses
    for (let downloadProcess of downloadProcesses) {
      if (cData.uuid === downloadProcess.uuid) {
        downloadProcess.downloadProcess.pauseDownload()
        for (let lData of updateData) {
          if (cData.uuid === lData.uuid) {
            lData.status = 'Paused'
            // update the item in storage
            settingsHandle.setStored('dldata', updateData)
            // emit event with the new data
            mrEmitter.emit('onUpdateData', updateData)
            break
          }
        }
        break
      }
    }
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
      sendData.url = cData.url
      sendData.uuid = cData.uuid
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
