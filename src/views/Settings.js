import React, {PropTypes, Component} from 'react'
import ReactDOM, {findDOMNode} from 'react-dom'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Menu from 'material-ui/Menu'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

import ListCheckbox from '../subviews/ListCheckbox'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let stored = {},
settingsHandle = new SettingsHandler(),
links = [
  'Theme',
  'Download Options',
  'Filesystem Options',
  'Desktop',
  'Workarounds'
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
        flex: '3 0 auto'
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
                      <ListCheckbox
                        text="Use only video ID in file name"
                        check={stored.filesystem.id}
                      />
                      <TextField
                        style={style.innerText}
                        hintText="Use without destination folder"
                        floatingLabelText="Output filename template "
                        value={stored.filesystem.output.data}
                      />
                      <ListCheckbox
                        text="Restrict filenames to only ASCII characters"
                        check={stored.filesystem.restrict}
                      />
                    </div>
                    )
                    case 3:
                    return (
                    <ListCheckbox
                      text="Show download status in taskbar"
                      check={stored.desktop.status}
                    />
                    )
                    case 4:
                    return (
                    <div>
                      <ListCheckbox
                        text="Suppress HTTPS certificate validation"
                        check={stored.workarounds.no_check_certificate}
                      />
                      <ListCheckbox
                        text="Use an unencrypted connection to retrieve information about the video. (Currently supported only for YouTube)"
                        check={stored.workarounds.prefer_insecure}
                      />
                      <TextField
                        style={style.innerText}
                        hintText="Use without destination folder"
                        floatingLabelText="Output filename template "
                        value={stored.filesystem.output.data}
                      />
                    </div>
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
