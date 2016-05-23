import React, {PropTypes} from 'react'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {List, ListItem} from 'material-ui/List'
import Menu from 'material-ui/Menu'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

// the storage helper
import Storage from '../helpers/Storage'

let stored = {
  data: [],
  theme: {},
  download: {},
  filesystem: {}
}

class Settings extends React.Component {
  constructor(props, context) {
    super(props, context)
    // initiate all the settings from storage here in order of being displayed
    // NOTE - are lower camel cased e.g dark-theme becomes darkTheme
    // see https://en.wikipedia.org/wiki/CamelCase
    // theme settings
    stored.theme.darkTheme = new Storage('darkTheme', true)
    // Download Options
    stored.download.retries = new Storage('retries', 10)
    stored.download.bufferSize = new Storage('bufferSize', 1024)
    // File Options
    stored.filesystem.id = new Storage('id', false)
    stored.filesystem.output = new Storage('output', 'default')
    stored.filesystem.restrict = new Storage('restrict', false)
    // also initiate the settings that are not being displayed
    stored.data = new Storage('data', '[]')
  }

  // functions to do the settings update work
  onDarkThemeToggle = () => {
    // update the stored dark theme
    stored.theme.darkTheme.toggleData()
    // update the theme on the parent
    this.props.updateTheme()
  }

  // update the id setting
  onIdToggle = () => {
    stored.filesystem.id.toggleData()
  }

  //  Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames
  onRestrictToggle = () => {
    stored.filesystem.restrict.toggleData()
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
        background: this.props.muiTheme.palette.alternateTextColor
      },
      toc: {
        width: '250px',
        paddingRight: '0.5em'
      },
      main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      },
      innerText: {
        width: 'calc(100% - 2em)',
        margin: 'auto 1em'
      }
    }

    return (
      <div style={style.container}>
        <div style={style.toc}>
          <Menu >
            <Subheader>Jump To</Subheader>
            <ListItem primaryText="Theme" />
            <ListItem primaryText="Download Options" />
            <ListItem primaryText="Filesystem Options" />
          </Menu>
        </div>
        <div style={style.main}>
          <Card style={style.card}>
            <List>
              <Subheader>Theme</Subheader>
              <ListItem
                primaryText="Use Dark Theme"
                rightToggle= {
                  <Toggle
                    defaultToggled = {JSON.parse(stored.theme.darkTheme.data)}
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
                    defaultChecked = {JSON.parse(stored.filesystem.id.data)}
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
                    defaultChecked = {JSON.parse(stored.filesystem.restrict.data)}
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

Settings.propTypes = {
  muiTheme: PropTypes.object
}

export default muiThemeable()(Settings)
