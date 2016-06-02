import React, {Component} from 'react'

const shell = window.require('electron').shell

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import BugReport from 'material-ui/svg-icons/action/bug-report'

const style = {
  margin: '12px'
}

export default class About extends Component {
  // on info button click
  openBugsPage = () => {
    shell.openExternal('https://github.com/puranjayjain/youtube-dl-gui/issues')
  }

  render() {
    const version = {
      node: "Node Js Version " + window.process.versions.node,
      chrome: "Chrome " + window.process.versions.chrome,
      electron: "Electron " + window.process.versions.electron
    }

    return (
      <div>
        <Card style={style}>
          <CardHeader
            title="Youtube Dl GUI"
            subtitle="v0.0.1"
            avatar="http://lorempixel.com/100/100/nature/"
          />
          <CardText>
            <List>
              <ListItem primaryText={version.node} />
              <ListItem primaryText={version.chrome} />
              <ListItem primaryText={version.electron} />
            </List>
          </CardText>
        </Card>
        <Card style={style}>
          <CardHeader
            title="Help and Feedback"
          />
          <CardText>
            <List>
              <ListItem
                onTouchTap={this.openBugsPage}
                primaryText="Report a Bug"
                rightIcon={<BugReport />}
              />
            </List>
          </CardText>
        </Card>
      </div>
    )
  }
}
