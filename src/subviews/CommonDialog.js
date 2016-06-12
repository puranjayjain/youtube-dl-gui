import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'

import moment from 'moment'
import bytes from 'bytes'

import Info from 'material-ui/svg-icons/action/info'

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
    data: ''
  }

  // filter the selected tableData
  filterSelected = (data) => !!data.selected

  handleClose = () => {
    this.setState({open: false})
  }

  onConfirmOkdelete = (tableData) => {
    // delete files from the list and the disk
    const listData = tableData.filter(this.filterSelected)
    let updateData = []
    // go through the whole data to match the ones with the selected one's uuid and add them to the updateData array
    for (let cData of stored.dldata.data) {
      for (let lData of listData) {
        if (lData.uuid === cData.uuid) {
          // delete from the disk
          fs.unlink(cData.fileName, function(e) {
            if (e) {
              console.error(e)
            }
          })
          break
        }
        else {
          updateData.push(cData)
        }
      }
    }
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
    Subscriptions.push(mrEmitter.addListener('onRequestSingleFileInfo', (sendData) => {
      this.state.data =
      <List style={style.list}>
        <ListItem
          innerDivStyle={style.listItem}
          primaryText="File Path"
          secondaryText={sendData.fileName}
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
        open: true,
        heading: 'Detailed Information',
        actions:
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
        />
      })
    }))
    Subscriptions.push(mrEmitter.addListener('onRequestFileInfo', (sendData) => {
      this.state.data =
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
        heading: 'Detailed Information',
        actions:
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
        />
      })
    }))
    Subscriptions.push(mrEmitter.addListener('onDeleteFromDisk', (tableData) => {
      console.log(tableData)
      this.state.data =
      <div>
        Are you sure you want to delete the file(s)?
      </div>
      this.setState({
        open: true,
        heading: 'Confirm deletion',
        actions:
        [<FlatButton
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
    }))
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
      </Dialog>
    )
  }
}
