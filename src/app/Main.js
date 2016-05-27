import React, {PropTypes} from 'react'

// import necessary components
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// import override light theme and dark theme we have created along with the provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import light from '../themes/light'
import dark from '../themes/dark'

// import our components
import Sidebar from './Sidebar'

// import subviews if any
import Addurl from '../subviews/Addurl'

// the storage helper
import Storage from '../helpers/Storage'

export default class Main extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  state = {
    muiTheme: '',
    darkTheme: new Storage('darkTheme', true)
  }

  // pass location context down the tree
  getChildContext() {
    return {
      location: this.props.location,
      muiTheme: this.state.muiTheme
    }
  }

  updateTheme = () => {
    // set muiTheme according to setting
    if (JSON.parse(this.state.darkTheme.data)) {
      this.setState({
        muiTheme: getMuiTheme(darkBaseTheme, dark())
      })
    }
    else {
      this.setState({
        muiTheme: getMuiTheme(light())
      })
    }
  }

  componentWillMount() {
    this.updateTheme()
  }

  render() {
    const style = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      overflow: 'auto',
      background: this.state.muiTheme.baseTheme.palette.background1Color
    }

    return (
      <MuiThemeProvider muiTheme={this.state.muiTheme}>
        <div style={style}>
          <Sidebar/>
          {this.props.children && React.cloneElement(this.props.children, {
            updateTheme: this.updateTheme
          })}
          <Addurl />
        </div>
      </MuiThemeProvider>
    )
  }
}

// passing the location route to children
Main.childContextTypes = {
  location: PropTypes.object,
  muiTheme: PropTypes.object.isRequired,
  updateTheme: PropTypes.func
}
