import React, {PropTypes} from 'react'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
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
    const styles = {
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
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.toc}>
          <List>
            <ListItem primaryText="Settings" />
            <ListItem primaryText="Help & feedback" />
            <Divider />
            <ListItem primaryText="Sign out" />
          </List>
        </div>
        <div style={styles.main}>
          <Card style={styles.card}>
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
          <Card style={styles.card}>
            <List>
              <Subheader>Theme</Subheader>
              <ListItem
                primaryText="Use Dark Theme"
              />
            </List>
          </Card>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default muiThemeable()(Settings)
