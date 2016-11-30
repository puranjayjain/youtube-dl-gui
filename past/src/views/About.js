import React, {Component} from 'react'

const shell = window.require('electron').shell

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import Restore from 'material-ui/svg-icons/action/restore'
import BugReport from 'material-ui/svg-icons/action/bug-report'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let settingsHandle = new SettingsHandler(),
stored = {}

const style = {
  card: {
    margin: '12px'
  },
  avatar: {
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '20px',
    borderRadius: '50%',
    height: '38px',
    width: '38px',
    border: '1px solid rgba(128, 128, 128, 0.14902)',
    WebkitUserSelect: 'none',
    background: 'url("icon.png") 0% 0% / 40px border-box'
  }
}

export default class About extends Component {
  // reset to factory settings
  resetToFactory = () => {
    // clear the settings
    localStorage.clear()
    // reload the app
    location.reload()
  }

  componentWillMount() {
    stored = settingsHandle.stored
  }

  // on info button click
  openBugsPage = () => {
    shell.openExternal('https://github.com/puranjayjain/youtube-dl-gui/issues')
  }

  render() {
    const version = {
      node: `Node Js Version ${window.process.versions.node}`,
      chrome: `Chrome ${window.process.versions.chrome}`,
      electron: `Electron ${window.process.versions.electron}`,
      youtubedl: `Youtubedl ${stored.youtubedl.data.version}`
    }

    return (
      <div>
        <Card style={style.card}>
          <CardHeader
            title="Youtube Dl GUI"
            subtitle="v0.0.2"
            avatar={<div style={style.avatar}></div>}
          />
          <CardText>
            <List>
              <ListItem primaryText={version.node} />
              <ListItem primaryText={version.chrome} />
              <ListItem primaryText={version.electron} />
              <ListItem primaryText={version.youtubedl} />
            </List>
          </CardText>
        </Card>
        <Card style={style.card}>
          <CardHeader
            title="Help and Feedback"
          />
          <CardText>
            <List>
              <ListItem
                onTouchTap={this.resetToFactory}
                primaryText="Reset to Default Settings"
                rightIcon={<Restore />}
              />
              <ListItem
                onTouchTap={this.openBugsPage}
                primaryText="Report a Bug"
                rightIcon={<BugReport />}
              />
              <ListItem
                primaryText="Check for Updates"
              />
            </List>
          </CardText>
        </Card>
      </div>
    )
  }
}
