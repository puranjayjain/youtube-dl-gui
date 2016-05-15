import React from 'react'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

// the storage helper
import Storage from '../helpers/storage'

let stored = {}

export default class Settings extends React.Component {

  constructor(props, context) {
    super(props, context)
    // initiate all the settings from storage here in order of being displayed
    // NOTE - are camelcased e.g dark-theme becomes darkTheme
    stored = new Storage('darkTheme', true)
  }

  render() {
    return (
      <List>
        <Subheader>Theme</Subheader>
        <ListItem
          primaryText="Use Dark Theme"
          rightToggle= {
            <Toggle
              defaultToggled = {true}
            />
          }
        />
      </List>
    )
  }
}
