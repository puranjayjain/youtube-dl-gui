import React, {PropTypes} from 'react'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

// the storage helper
import Storage from '../helpers/storage'

let stored = {
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
  }

  // functions to do the settings update work
  onDarkThemeToggle = () => {
    // update the stored dark theme
    stored.theme.darkTheme.data = JSON.stringify(!JSON.parse(stored.theme.darkTheme.data))
  }

  onIdToggle = () => {
    // update the id setting
    stored.filesystem.id.data = JSON.stringify(!JSON.parse(stored.filesystem.id.data))
  }

  onRestrictToggle = () => {
    //  Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames
    stored.filesystem.restrict.data = JSON.stringify(!JSON.parse(stored.filesystem.restrict.data))
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
        background: this.props.muiTheme.palette.primary9Color
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
          <List>
            <Subheader>Jump To</Subheader>
            <ListItem primaryText="Theme" />
            <ListItem primaryText="Download Options" />
            <ListItem primaryText="Filesystem Options" />
          </List>
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
                rightToggle= {
                  <Toggle
                    defaultToggled = {JSON.parse(stored.filesystem.id.data)}
                    onToggle = {this.onIdToggle}
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
                rightToggle= {
                  <Toggle
                    defaultToggled = {JSON.parse(stored.filesystem.restrict.data)}
                    onToggle = {this.onIdToggle}
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
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Settings)
