import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import Popover from 'material-ui/Popover'

import moment from 'moment'
import bytes from 'bytes'

import Edit from 'material-ui/svg-icons/image/edit'
import Info from 'material-ui/svg-icons/action/info'

import {Errordata} from '../Data/Messagedata'
import SettingsHandler from '../helpers/SettingsHandler'
import mrEmitter from '../helpers/mrEmitter'

// remove this subscription afterwards when there is no use for it
let Subscriptions = [],
style = {
  list: {
    padding: 0
  },
  listItem: {
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  textPopOver: {
    width: '600px'
  }
},
settingsHandle = new SettingsHandler(),
stored = settingsHandle.stored

// file info dialog
export default class CommonDialog extends Component {
  state = {
    open: false,
    heading: '',
    actions: <div></div>,
    data: '',
    edit: '',
    uuid: '',
    url: '',
    path: '',
    openPopOver: false,
    textPopOver: ''
  }

  // filter the selected tableData
  filterSelected = (data) => !!data.selected

  filterNotSelected = (data) => !!!data.selected

  handleClose = () => {
    this.setState({open: false})
    // now close the toolbar
    mrEmitter.emit('onCloseToolbar')
  }

  // on change event of the input in popover
  setText = (event) => this.setState({textPopOver: event.target.value})

  /**
  * [on any input's keypress]
  * @method
  * @param  {Event}   event     [Event for the text input]
  */
  onTextKeyPress = (event) => {
    // enter key
    if (event.keyCode === 13) {
      // check the download process for that
      for (let cProcess of this.context.downloadProcesses) {
        if (cProcess.uuid === uuid) {
          // display can't move file or change it's url while downloading
          mrEmitter.emit('onShowError', Errordata.videoDownloading)
          return
        }
      }
      // do stuff according to the mode
      if (this.state.edit === 'url') {
        settingsHandle.updateDlDataItem(this.state.url, 'url', this.state.url)
      }
      // if not downloading then move it and if file exists then move it

      // else show error of file not found and remove it from list

      // close the popover
      this.onCloseEdit()
    }
    // escape key
    else if (event.keyCode === 27) {
      // close the popover
      this.onCloseEdit()
    }
    // prevent the default action
    event.stopPropagation()
  }

  onTriggerEdit = (event, edit) => {
    this.setState({
      openPopOver: true,
      anchorEl: event.currentTarget,
      edit: edit,
      textPopOver: this.state[edit]
    })
    // focus the textfield inside
    setTimeout(() => this.refs.editPopover.focus(), 500)
  }

  onCloseEdit = () => this.setState({openPopOver: false})

  onConfirmOkdelete = (tableData) => {
    // delete files from the list and the disk
    const listData = tableData.filter(this.filterSelected)
    let updateData = stored.dldata.data
    // go through the whole data to match the ones with the selected one's uuid and add them to the updateData array
    for (var i = 0; i < updateData.length; i++) {
      let cData = updateData[i]
      for (let lData of listData) {
        if (lData.uuid === cData.uuid) {
          // delete from the list
          updateData.splice(i, 1)
          // delete from the disk
          fs.unlink(cData.fileName, function(e) {
            if (e) {
              console.error(e)
            }
          })
          break
        }
      }
    }
    // now close the toolbar
    mrEmitter.emit('onCloseToolbar')
    // update the item in storage
    settingsHandle.setStored('dldata', updateData)
    // emit event with the new data
    mrEmitter.emit('onUpdateData', updateData)
    // close the dialog
    this.handleClose()
  }

  componentDidMount() {
    // add emitter event listener
    // events for single file request info or multiple files request info
    Subscriptions.push(
      mrEmitter.addListener('onRequestSingleFileInfo', (sendData) => {
        let data =
        <List style={style.list}>
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="Download url"
            secondaryText={sendData.url}
            rightIconButton={
              <Edit
                onTouchTap={(event) => this.onTriggerEdit(event, 'url')}
                tooltip="Change download url"
              />
            }
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="File Path"
            secondaryText={sendData.fileName}
            rightIconButton={
              <Edit
                onTouchTap={(event) => this.onTriggerEdit(event, 'path')}
                tooltip="Change file path or move it"
              />
            }
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="File size"
            secondaryText={bytes(sendData.size)}
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="File size on Disk"
            secondaryText={bytes(sendData.downloaded)}
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="Last try"
            secondaryText={moment(sendData.lastTry).fromNow()}
          />
        </List>
        this.setState({
          data: data,
          url: sendData.url,
          path: sendData.fileName,
          open: true,
          heading: 'Detailed Information',
          actions:
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />
        })
      }),
      mrEmitter.addListener('onRequestFileInfo', (sendData) => {
        let data =
        <List style={style.list}>
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="Number of Files"
            secondaryText={sendData.files}
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="File size"
            secondaryText={bytes(sendData.size)}
          />
          <ListItem
            innerDivStyle={style.listItem}
            primaryText="File size on Disk"
            secondaryText={bytes(sendData.downloaded)}
          />
        </List>
        this.setState({
          open: true,
          data: data,
          heading: 'Detailed Information',
          actions:
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />
        })
      }),
      mrEmitter.addListener('onDeleteFromDisk', (tableData) => {
        let data =
        <div>
          Are you sure you want to delete the file(s)?
        </div>
        this.setState({
          open: true,
          data: data,
          heading: 'Confirm deletion',
          actions: [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Ok"
              primary={true}
              onTouchTap={this.onConfirmOkdelete.bind(this, tableData)}
            />]
          })
        }
      )
    )
  }

  componentWillUnmount() {
    // remove emitter event listeners
    for (let Subscription of Subscriptions) {
      Subscription.remove()
    }
  }

  render() {
    return (
      <Dialog
        title={this.state.heading}
        actions={this.state.actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {this.state.data}
        <Popover
          className="popover-fix"
          open={this.state.openPopOver}
          onRequestClose={this.onCloseEdit}
          anchorEl={this.state.anchorEl}
          zDepth={3}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <TextField
            style={style.textPopOver}
            value={this.state.textPopOver}
            onChange={this.setText}
            onKeyUp={this.onTextKeyPress}
            ref="editPopover"
            hintText="Press Enter to save, Escape to exit"
            floatingLabelText="Edit"
          />
        </Popover>
      </Dialog>
    )
  }
}

CommonDialog.contextTypes = {
  downloadProcesses: PropTypes.array.isRequired
}
