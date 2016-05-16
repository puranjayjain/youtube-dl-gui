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
  download: {}
}

class Settings extends React.Component {
  constructor(props, context) {
    super(props, context)
    // initiate all the settings from storage here in order of being displayed
    // NOTE - are camelcased e.g dark-theme becomes darkTheme
    // theme settings
    stored.theme.darkTheme = new Storage('darkTheme', true)
    // Download Options
    stored.download.retries = new Storage('retries', 10)
  }

  // functions to do the settings update work
  onDarkThemeToggle = () => {
    // update the stored dark theme
    stored.theme.darkTheme.data = JSON.stringify(!JSON.parse(stored.theme.darkTheme.data))
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
