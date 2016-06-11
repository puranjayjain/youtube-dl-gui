import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'

import moment from 'moment'
import bytes from 'bytes'

import Info from 'material-ui/svg-icons/action/info'

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
}

// file info dialog
export default class FileInfoDialog extends Component {
  state = {
    open: false,
    data: ''
  }

  handleClose = () => {
    this.setState({open: false})
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
      this.setState({open: true})
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
      this.setState({open: true})
    }))
  }

  componentWillUnmount() {
    // remove emitter event listeners
    for (let Subscription of Subscriptions) {
      Subscription.remove()
    }
  }

  render() {
    const actions =
    <FlatButton
      label="Close"
      primary={true}
      onTouchTap={this.handleClose}
    />

    return (
      <Dialog
        title="Detailed Information"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {this.state.data}
      </Dialog>
    )
  }
}
