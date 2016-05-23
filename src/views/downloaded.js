import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {fade} from 'material-ui/utils/colorManipulator'
import Checkbox from 'material-ui/Checkbox'

// icons
import Clear from 'material-ui/svg-icons/content/clear'
import Delete from 'material-ui/svg-icons/action/delete'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Pause from 'material-ui/svg-icons/av/pause-circle-filled'
import Play from 'material-ui/svg-icons/av/play-arrow'

let tableData = [
  {
    fileName: 'John Smith dsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    size: '94 Mb',
    lastTry: '17/05/2016'
  },
  {
    fileName: 'John Smith',
    size: '94 Mb',
    lastTry: '17/05/2016'
  }
]

let checkboxes = 0

class Downloaded extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    toolbar: false
  }

  // toggle toolbar's visibility
  onToggleToolbar = (state, callback) => this.setState({toolbar: state}, callback)

  /**
   * [Event handler for select all checkbox]
   * @param  {[Event]}  event         [event]
   * @param  {Boolean} isInputChecked [tells if the input was checked or not]
   * @param  {[Boolean]}  called      [if the event was called from outside or recursively via a callback]
   */
  onAllChecked = (event, isInputChecked, called) => {
    if (called) {
      for (let i = 0; i < checkboxes; i++) {
        this.refs['check' + i].setChecked(isInputChecked)
      }
    }
    else {
      // update the toolbar
      this.onToggleToolbar(isInputChecked, this.onAllChecked.bind(this, event, isInputChecked, true))
    }
    // toggle this component's state
    this.refs.allcheck.setChecked(isInputChecked)
  }

  // on checking of one of the checkbox
  onChecked = (index) => {
    console.log(index);
    console.log(this);
  }

  // close the toolbar
  onCloseToolbar = (e) => {
    // trigger all checked
    this.onAllChecked(e, false)
  }

  render() {
    const style = {
      multiLineItem: {
        whiteSpace: 'normal'
      },
      toolbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        paddingLeft: '3em',
        height: '64px',
        alignItems: 'center',
        visibility: this.state.toolbar ? 'visible' : 'hidden',
        zIndex: 2
      },
      toolbarGroup1: {
        alignItems: 'center'
      },
      Seperator: {
        top: 'auto',
        marginLeft: '.5em',
        background: fade(this.props.muiTheme.palette.textColor, 0.5)
      },
      toolbarTitle1: {
        paddingLeft: '.5em',
        color: this.props.muiTheme.palette.textColor
      },
      deleteForever: {
        background: this.props.muiTheme.palette.primary1Color,
        borderRadius: '50%'
      },
      tableColumn: {
        width: '24px'
      }
    }

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="toolbarAnimate" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          <Toolbar
            key={this.state.toolbar}
            style={style.toolbar}
          >
            <ToolbarGroup
              style={style.toolbarGroup1}
              firstChild={true}
            >
              <IconButton
                onTouchTap={this.onCloseToolbar}
                tooltip="Clear selection"
              >
                <Clear />
              </IconButton>
              <ToolbarSeparator style={style.Seperator}/>
              <ToolbarTitle
                style={style.toolbarTitle1}
                text="1 Selected"
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton tooltip="Resume">
                <Play />
              </IconButton>
              <IconButton tooltip="Pause">
                <Pause />
              </IconButton>
              <IconButton tooltip="Remove from List">
                <Delete />
              </IconButton>
              <IconButton
                style={style.deleteForever}
                tooltip="Delete from Disk"
              >
                <DeleteForever />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </ReactCSSTransitionGroup>
        <Table
          ref="table"
          selectable={false}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={style.tableColumn}>
                <Checkbox
                  ref={"allcheck"}
                  onCheck={this.onAllChecked}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>File Name</TableHeaderColumn>
              <TableHeaderColumn>Size</TableHeaderColumn>
              <TableHeaderColumn>Last Try</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={true}
          >
            {tableData.map( (row, index) => (
              <TableRow>
                <TableRowColumn style={style.tableColumn}>
                  <Checkbox
                    ref={"check" + index}
                    onCheck={() => this.onChecked(index)}
                  />
                </TableRowColumn>
                <TableRowColumn style={style.multiLineItem}>{row.fileName}</TableRowColumn>
                <TableRowColumn>{row.size}</TableRowColumn>
                <TableRowColumn>{row.lastTry}</TableRowColumn>
              </TableRow>
            ))}
            {checkboxes = tableData.length}
          </TableBody>
          >
        </Table>
      </div>
    )
  }
}

Downloaded.propTypes = {
  muiTheme: PropTypes.object
}

export default muiThemeable()(Downloaded)
