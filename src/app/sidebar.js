import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'

const iconStyles = {
  marginRight: 24,
  verticalAlign: 'middle'
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

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div>
        <AppBar title="Title" onLeftIconButtonTouchTap={this.handleToggle}/>
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onTouchTap={this.handleClose}>
            <FontIcon className="material-icons" style={iconStyles}>
              all_inclusive
            </FontIcon>
            All
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <FontIcon className="material-icons" style={iconStyles}>
              done
            </FontIcon>
            Downloaded
          </MenuItem>
          <Divider/>
          <MenuItem onTouchTap={this.handleClose}>
            <FontIcon className="material-icons" style={iconStyles}>
              settings
            </FontIcon>
            Settings
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <FontIcon className="material-icons" style={iconStyles}>
              help
            </FontIcon>
            About
          </MenuItem>
        </Drawer>
      </div>
    )
  }
}
