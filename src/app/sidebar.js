import React from 'react'
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

const style = {
  overflow: 'hidden'
}

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
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
  }

  // capitalize the first letter of string
  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  // check if that menu item should have the active class
  isActive = () => {
    if (this.context.history.isActive(this.context.location.pathname)) {
      return 'active'
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
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer containerStyle={style} docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Menu onItemTouchTap={this.changePage}>
            <MenuItem className={this.isActive()} primaryText="All" value="/" leftIcon={< AllInclusive />} />
            <MenuItem className={this.isActive()} primaryText="Downloading" value="/downloading" leftIcon={< FileDownload />} />
            <MenuItem className={this.isActive()} primaryText="Downloaded" value="/downloaded" leftIcon={< Done />} />
            <Divider/>
            <MenuItem className={this.isActive()} primaryText="Settings" value="/settings" leftIcon={< Settings />} />
            <MenuItem className={this.isActive()} primaryText="About" value="/about" leftIcon={< Help />} />
          </Menu>
        </Drawer>
      </div>
    )
  }
}

Sidebar.contextTypes = {
  location: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
}
