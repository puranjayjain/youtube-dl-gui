import React from 'react'
import { render } from 'react-dom'

// import necessary components
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// import override light theme and dark theme we have created along with the provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import light from '../themes/light'
import dark from '../themes/dark'

// import our components
import Sidebar from './sidebar'

const muiTheme = dark()

class Main extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Sidebar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
