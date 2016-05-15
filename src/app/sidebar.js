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

  render() {
    return (
      <div>
        <AppBar title="Title" onLeftIconButtonTouchTap={this.handleToggle}/>
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
