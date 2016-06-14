import React, {PropTypes, Component} from 'react'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Menu from 'material-ui/Menu'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let stored = {}

let settingsHandle = new SettingsHandler()

export default class Settings extends Component {
  // functions to do the settings update work
  onDarkThemeToggle = () => {
    // update the stored dark theme
    stored.theme.darkTheme.toggleData()
    // update the theme on the parent
    this.props.updateTheme()
    // TODO display in snackbar that the theme couldnot be updated globally so please restart the app to apply it

  }

  // update the id setting
  onIdToggle = () => {
    stored.filesystem.id.toggleData()
  }

  //  Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames
  onRestrictToggle = () => {
    stored.filesystem.restrict.toggleData()
  }

  componentWillMount(){
    // load all the settings
    stored = settingsHandle.stored
  }

  render() {
    const style = {
      container: {
        display: 'flex',
        width: '100%'
      },
      card: {
        flex: 1,
        marginTop: '1em',
        marginRight: '1em',
        background: this.context.muiTheme.palette.alternateTextColor
      },
      toc: {
        paddingRight: '0.5em',
        flex: 3
      },
      main: {
        display: 'flex',
        flex: '8 0 auto',
        flexDirection: 'column'
      },
      innerText: {
        width: 'calc(100% - 2em)',
        margin: 'auto 1em'
      }
    }

    return (
      <div style={style.container}>
        <List style={style.toc}>
          <Subheader>Jump To</Subheader>
          <ListItem primaryText="Theme" />
          <ListItem primaryText="Download Options" />
          <ListItem primaryText="Filesystem Options" />
        </List>
        <div style={style.main}>
          <Card style={style.card}>
            <List>
              <Subheader>Theme</Subheader>
              <ListItem
                primaryText="Use Dark Theme"
                rightToggle= {
                  <Toggle
                    defaultToggled = {stored.theme.darkTheme.data}
                    onToggle = {this.onDarkThemeToggle}
                  />
                }
              />
            </List>
          </Card>
          <Card style={style.card}>
            <List>
              <Subheader>Download Options</Subheader>
              <TextField
                style={style.innerText}
                hintText="(default is 10),supports integer or infinite"
                floatingLabelText="Maximum Number of retries"
                value={stored.download.retries.data}
              />
              <TextField
                style={style.innerText}
                hintText="(default is 1024),supports integers"
                floatingLabelText="Size of download buffer"
                value={stored.download.bufferSize.data}
              />
            </List>
          </Card>
          <Card style={style.card}>
            <List>
              <Subheader>Filesystem Options</Subheader>
              <ListItem
                primaryText="Use only video ID in file name"
                leftCheckbox= {
                  <Checkbox
                    defaultChecked = {stored.filesystem.id.data}
                    onCheck = {this.onIdToggle}
                  />
                }
              />
              <TextField
                style={style.innerText}
                hintText="Use without destination folder"
                floatingLabelText="Output filename template "
                value={stored.filesystem.output.data}
              />
              <ListItem
                primaryText="Restrict filenames to only ASCII characters"
                leftCheckbox = {
                  <Checkbox
                    defaultChecked = {stored.filesystem.restrict.data}
                    onCheck = {this.onIdToggle}
                  />
                }
              />
            </List>
          </Card>
          <Card style={style.card}>
            <List>
              <Subheader>Desktop</Subheader>
              <ListItem
                primaryText="Show download status in taskbar"
                leftCheckbox= {
                  <Checkbox
                    defaultChecked = {stored.desktop.status.data}
                    onCheck = {this.onIdToggle}
                  />
                }
              />
            </List>
          </Card>
        </div>
      </div>
    )
  }
}

Settings.contextTypes = {
  muiTheme: PropTypes.object
}
