import React from 'react'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

export default class Settings extends React.Component {
  render() {
    return (
      <List>
        <Subheader>Theme</Subheader>
        <ListItem primaryText="Use Dark Theme" rightToggle={< Toggle defaultToggled = {
          true
        } />}/>
      </List>
    )
  }
}
