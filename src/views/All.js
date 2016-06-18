import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import moment from 'moment'
import bytes from 'bytes'

// Custom components
import AllPlaceHolder from '../placeholders/AllPlaceHolder'
import mrEmitter from '../helpers/mrEmitter'

// icons
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
import Delete from 'material-ui/svg-icons/action/delete'
import Pause from 'material-ui/svg-icons/av/pause'
import Play from 'material-ui/svg-icons/av/play-arrow'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let settingsHandle = new SettingsHandler(),
stored = {},
// remove this subscription afterwards when there is no use for it
Subscriptions = []

export default class All extends Component {
  state = {
    actionHolder: false,
    table: true,
    tableData: [
      // {
      //     uuid: 'uuid',
      //     fileName: 'C:\Users\User\Music\Song.mp4', // full path to file,
      //     url: 'the-website-url-download-the-video.mp4',
      //     size: '94 Mb', // full size in mb
      //     lastTry: '17/05/2016 9:06 AM', // last attempt at downloading the file
      //     downloaded: '5 MB',
      //     status: 'Paused', // can have values as 'Starting', 'Paused', 'Downloading', 'Error', 'Canceled', 'Done'
      // },
      // {
      //     uuid: 'uuid',
      //     fileName: 'C:\Users\User\Music\Song.mp4', // full path to file
      //     url: 'the-website-url-download-the-video.mp4',
      //     size: '94 Mb', // full size in mb
      //     lastTry: '17/05/2016 9:06 AM', // last attempt at downloading the file
      //     downloaded: '5 MB',
      //     status: 'Paused', // can have values as 'Starting', 'Paused', 'Downloading', 'Error', 'Canceled', 'Done'
      // }
    ]
  }

  onShowActions = (rowNumber) => {
    this.setState({actionHolder: true})
  }

  onHideActions = (rowNumber) => {
    this.setState({actionHolder: false})
  }

  // register all adding stuff here
  componentWillMount() {
    // load all the settings
    stored = settingsHandle.stored
    // update the local data
    this.setState({tableData: stored.dldata.data})
  }

  // show or hide the table function
  componentDidMount() {
    // if table's length is zero show the EmptyPlaceHolder and hide the table
    if (!this.state.tableData.length) {
      this.setState({table: false})
      setTimeout(() => {
        this.refs.allPlaceHolder.setState({visible: true})
      }, 700)
    }
    // add emitter event listener
    Subscriptions.push(mrEmitter.addListener('onUpdateData', (updateData) => this.setState({tableData: updateData})))
  }

  componentWillUnmount() {
    // remove emitter event listeners
    for (let Subscription of Subscriptions) {
      Subscription.remove()
    }
  }

  render() {
    const style = {
      table: {
        display: this.state.table ? 'table' : 'none'
      },
      tableColumn: {
        whiteSpace: 'normal'
      },
      actionButton: {
        width: 36,
        height: 36,
        padding: 0
      },
      actionHolder: {
        display: this.state.actionHolder ? 'flex' : 'none',
        position: 'absolute',
        top: '130px',
        right: 0
      },
      actionMenu: {
        width: 200,
      }
    }

    return (
      <div>
        <Table
          ref="table"
          style={style.table}
          selectable={false}
          onRowHover={this.onShowActions}
          onRowHoverExit={this.onHideActions}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>File Name</TableHeaderColumn>
              <TableHeaderColumn>Downloaded</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Size</TableHeaderColumn>
              <TableHeaderColumn>Last Try</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={true}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn style={style.tableColumn}>{row.fileName}</TableRowColumn>
                <TableRowColumn>{bytes(row.downloaded)}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{bytes(row.size)}</TableRowColumn>
                <TableRowColumn>{moment(row.lastTry).fromNow()}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          >
        </Table>
        <ReactCSSTransitionGroup transitionName="toolbarAnimate" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          <div
            style={style.actionHolder}
            ref="actionHolder"
          >
            <IconButton
              style={style.actionButton}
              tooltip="Resume"
            >
              <Play />
            </IconButton>
            <IconButton
              style={style.actionButton}
              tooltip="Pause"
            >
              <Pause />
            </IconButton>
            <IconButton
              style={style.actionButton}
              tooltip="Remove from list"
            >
              <Delete />
            </IconButton>
            <IconMenu
              useLayerForClickAway={true}
              iconButtonElement={
                <IconButton
                  style={style.actionButton}
                >
                  <MoreVert />
                </IconButton>
              }
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Redownload" />
              <MenuItem primaryText="File Info" />
              <MenuItem primaryText="Delete from disk" />
            </IconMenu>
          </div>
        </ReactCSSTransitionGroup>
        <AllPlaceHolder ref="allPlaceHolder" />
      </div>
    )
  }
}
