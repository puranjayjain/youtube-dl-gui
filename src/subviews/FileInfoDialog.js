import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import Info from 'material-ui/svg-icons/action/info'

import mrEmitter from '../helpers/mrEmitter'

// remove this subscription afterwards when there is no use for it
let Subscriptions = []

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
      this.setState({open: true})
    }))
    Subscriptions.push(mrEmitter.addListener('onRequestFileInfo', (sendData) => {
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
        title="Dialog With Actions"
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
