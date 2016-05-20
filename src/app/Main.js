import React from 'react'
import { render } from 'react-dom'

// import necessary components
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// import override light theme and dark theme we have created along with the provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import light from '../themes/light'
import dark from '../themes/dark'

// import our components
import Sidebar from './sidebar'

// import subviews if any
import Addurl from '../subviews/addurl'

// the storage helper
import Storage from '../helpers/storage'

let muiTheme

let darkTheme = {}

export default class Main extends React.Component {
  constructor(props, context) {
    super(props, context)

    // theme settings
    darkTheme = new Storage('darkTheme', true)
    // load the default theme
    this.updateTheme()
    // TODO add observables to update the theme on settings update
  }

  updateTheme = () => {
    // set muiTheme according to setting
    if (darkTheme.data) {
      muiTheme = dark()
    }
    else {
      muiTheme = light()
    }
  }

  render() {
    const style = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      overflow: 'auto',
      background: muiTheme.baseTheme.palette.background1Color
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={style}>
          <Sidebar />
          {this.props.children}
          <Addurl />
        </div>
      </MuiThemeProvider>
    )
  }
}
