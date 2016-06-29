// list item with checkbox
import React, {PropTypes, Component} from 'react'

import {ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

export default class ListCheckbox extends Component {
  static propTypes = {
    text: PropTypes.string,
    check: PropTypes.object
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  // on toggle a property
  onToggleTouch = (property) => property.toggleData()

  render() {
    return (
      <ListItem
        primaryText={this.props.text}
        leftCheckbox= {
          <Checkbox
            defaultChecked = {!!this.props.check.data}
            onCheck = {() => this.onToggleTouch(this.props.check)}
          />
        }
      />
    )
  }
}
