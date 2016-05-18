import React from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'

// icons
import AllInclusive from 'material-ui/svg-icons/places/all-inclusive'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Done from 'material-ui/svg-icons/action/done'
import Settings from 'material-ui/svg-icons/action/settings'
import Help from 'material-ui/svg-icons/action/help'
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
  fab: {
    position: 'fixed',
    bottom: '25px',
    right: '20px',
    zIndex: 2
  },
  drawer: {
    overflow: 'hidden'
  }
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

  // update page title according to route
  updateTitle = () => {
    let cHash = window.location.hash
    const regExp = /\w+/g
    cHash = cHash.match(regExp)[0]
    if (cHash === '' || cHash === '_k') {
      cHash = 'All'
    }
    else {
      cHash = this.capitalize(cHash.toLowerCase())
    }
    title = cHash
    this.refs.AppBar.props.title = cHash
    // force update it's look
    // FIXME changet this to something standard. happening due to a bug https://github.com/callemall/material-ui/issues/4274
    this.refs.AppBar.forceUpdate()
  }

  componentDidMount = () => {
    // on page load
    this.updateTitle()
    // window hash change function
    window.addEventListener('hashchange', (function(_this) {
      return function() {
        _this.updateTitle()
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
        <Drawer containerStyle={style.drawer} docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Menu onItemTouchTap={this.changePage}>
            <MenuItem primaryText="All" value="/" leftIcon={< AllInclusive />} />
            <MenuItem primaryText="Downloading" value="/downloading" leftIcon={< FileDownload />} />
            <MenuItem primaryText="Downloaded" value="/downloaded" leftIcon={< Done />} />
            <Divider/>
            <MenuItem primaryText="Settings" value="/settings" leftIcon={< Settings />} />
            <MenuItem primaryText="About" value="/about" leftIcon={< Help />} />
          </Menu>
        </Drawer>
        <FloatingActionButton secondary={true} style={style.fab}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
