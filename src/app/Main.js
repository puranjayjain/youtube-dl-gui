/**
 * In this file, we create a React component
 * which incorporates components provided by material-ui.
 */

import React from 'react'

// import necessary components
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// import override light theme and dark theme we have created along with the provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import light from '../themes/light'

// import our components
import Sidebar from '../app/sidebar'

const muiTheme = light()

class Main extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleTouchTap = this.handleTouchTap.bind(this)

    this.state = {
      open: false,
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  handleTouchTap() {
    this.setState({
      open: true,
    })
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Sidebar />
          <Dialog
            open={this.state.open}
            title="Super Secret Password"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            1-2-3-4-5
          </Dialog>
          <h1>material-ui</h1>
          <h2>example project</h2>
          <RaisedButton
            label="Super Secret Password"
            primary={true}
            onTouchTap={this.handleTouchTap}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
