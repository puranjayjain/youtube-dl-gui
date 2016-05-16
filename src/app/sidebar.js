import React from 'react'

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

const drawerStyle = {
  overflow: 'hidden'
}

let title = 'All'

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
  componentDidMount = () => {
    // window hash change function
    window.addEventListener('hashchange', (function(_this) {
      return function() {
        let cHash = window.location.hash
        let regExp = /\w+/g
        cHash = cHash.match(regExp)[0]
        if (cHash === '' || cHash === '_k') {
          cHash = 'All'
        }
        else {
          cHash = _this.capitalize(cHash.toLowerCase())
        }
        title = cHash
        _this.refs.AppBar.props.title = cHash
        // force update it's look
        // FIXME changet this to something standard. happening due to a bug https://github.com/callemall/material-ui/issues/4274
        _this.refs.AppBar.forceUpdate()
      }
    })(this))
  }

  render() {
    return (
      <div>
        <AppBar
          ref="AppBar"
          title={title}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer containerStyle={drawerStyle} docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Menu onItemTouchTap={this.changePage}>
            <MenuItem primaryText="All" value="/" leftIcon={< AllInclusive />} />
            <MenuItem primaryText="Downloading" value="/downloading" leftIcon={< FileDownload />} />
            <MenuItem primaryText="Downloaded" value="/downloaded" leftIcon={< Done />} />
            <Divider/>
            <MenuItem primaryText="Settings" value="/settings" leftIcon={< Settings />} />
            <MenuItem primaryText="About" value="/about" leftIcon={< Help />} />
          </Menu>
        </Drawer>
      </div>
    )
  }
}
