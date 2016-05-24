import React, {PropTypes} from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

// icons
import AllInclusive from 'material-ui/svg-icons/places/all-inclusive'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Done from 'material-ui/svg-icons/action/done'
import Settings from 'material-ui/svg-icons/action/settings'
import Help from 'material-ui/svg-icons/action/help'

import mrEmitter from '../helpers/mrEmitter'

const style = {
  drawer: {
    overflow: 'hidden'
  },
  appbar: {
    zIndex: 1
  }
}

export default class Sidebar extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  })

  handleClose = () => this.setState({
    open: false
  })

  changePage = (e, menuItem) => {
    window.location.hash = menuItem.props.value
    this.handleClose()
    // emit onRouteChange event
    mrEmitter.emit('onRouteChange', menuItem.props.value)
  }

  // capitalize the first letter of string
  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1)
  }

  // check if that menu item should have the active class
  isActive = (to) => {
    if (this.context.location.pathname === to) {
      return {
        background: this.context.muiTheme.palette.primary1Color,
        color: this.context.muiTheme.palette.alternateTextColor
      }
    }
    else {
      return ''
    }
  }

  // check if that icon should have the active class
  isActiveIcon = (to) => {
    if (this.context.location.pathname === to) {
      return {
        fill: this.context.muiTheme.palette.textColor,
        color: this.context.muiTheme.palette.textColor
      }
    }
    else {
      return ''
    }
  }

  // get page title according to the page
  getPageTitle = () => {
    const title = this.capitalize(this.context.location.pathname.replace('/', ''))
    if (title === '') {
      return 'All'
    }
    else {
      return title
    }
  }

  render() {
    return (
      <div>
        <AppBar
          ref="AppBar"
          title={this.getPageTitle()}
          on
          leftIconButtonTouchTap={this.handleToggle}
          style={style.appbar}
        />
        <Drawer c
          ontainerStyle={style.drawer}
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Menu onItemTouchTap={this.changePage}>
            <MenuItem
              innerDivStyle={this.isActive('/')}
              primaryText="All" value="/"
              leftIcon={
                <AllInclusive style={this.isActiveIcon('/')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/downloading')}
              primaryText="Downloading" value="/downloading"
              leftIcon={
                <FileDownload style={this.isActiveIcon('/downloading')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/downloaded')}
              primaryText="Downloaded" value="/downloaded"
              leftIcon={
                <Done style={this.isActiveIcon('/downloaded')} />
              }
            />
            <Divider />
            <MenuItem
              innerDivStyle={this.isActive('/settings')}
              primaryText="Settings" value="/settings"
              leftIcon={
                <Settings style={this.isActiveIcon('/settings')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/about')}
              primaryText="About" value="/about"
              leftIcon={
                <Help style={this.isActiveIcon('/about')} />
              }
            />
          </Menu>
        </Drawer>
      </div>
    )
  }
}

Sidebar.contextTypes = {
  location: React.PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
}
