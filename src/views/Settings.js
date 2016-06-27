import React, {PropTypes, Component} from 'react'
import ReactDOM, {findDOMNode} from 'react-dom'

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

let stored = {},
settingsHandle = new SettingsHandler(),
links = [
  'Theme',
  'Download Options',
  'Filesystem Options',
  'Desktop'
]

export default class Settings extends Component {
  // functions to do the settings update work
  onDarkThemeToggle = () => {
    // update the stored dark theme
    stored.theme.darkTheme.toggleData()
    // update the theme on the parent
    this.props.updateTheme()
  }

  // on touch tap go to link
  onTouchLink = (index) => findDOMNode(this.refs[`card${index}`]).scrollIntoView()

  // update the id setting
  onIdToggle = () => stored.filesystem.id.toggleData()

  //  Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames
  onRestrictToggle = () => stored.filesystem.restrict.toggleData()

  // on toggle the desktop taskbar controller
  onDesktopStatusToggle = () => stored.desktop.status.toggleData()

  componentWillMount() {
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
        flexDirection: 'column',
        marginBottom: '1em'
      },
      innerText: {
        width: 'calc(100% - 2em)',
        margin: 'auto 1em'
      }
    }

    return (
      <div style={style.container}>
        <List
          style={style.toc}
        >
          <Subheader>Jump To</Subheader>
          {links.map( (row, index) => (
            <ListItem
              onTouchTap={() => this.onTouchLink(index)}
              key={`li-${index}`}
              primaryText={row}
            />
          ))}
        </List>
        <div style={style.main}>
          {links.map((row, index) => (
            <Card
              ref={`card${index}`}
              key={`item-${index}`}
              style={style.card}
            >
              <List>
                <Subheader>{row}</Subheader>
                {((index) => {
                  switch (index) {
                    case 1:
                    return (
                      <div >
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
                      </div>
                    )
                    case 2:
                    return (
                    <div>
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
                    </div>
                    )
                    case 3:
                    return (
                    <ListItem
                      primaryText="Show download status in taskbar"
                      leftCheckbox= {
                        <Checkbox
                          defaultChecked = {stored.desktop.status.data}
                          onCheck = {this.onDesktopStatusToggle}
                        />
                      }
                    />
                    )
                    // case 0 is at the last
                    default:
                    return (
                    <ListItem
                      primaryText="Use Dark Theme"
                      rightToggle= {
                        <Toggle
                          defaultToggled={stored.theme.darkTheme.data}
                          onToggle={this.onDarkThemeToggle}
                        />
                      }
                    />)
                  }
                })(index)}
              </List>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

Settings.contextTypes = {
  muiTheme: PropTypes.object
}
