import React, {PropTypes, Component} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import moment from 'moment'
import bytes from 'bytes'

// Custom components
import AllPlaceHolder from '../placeholders/AllPlaceHolder'
import mrEmitter from '../helpers/mrEmitter'
import ToolbarActions from '../helpers/ToolbarActions'

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
      //     hashid: 'hashid',
      //     fileName: 'C:\Users\User\Music\Song.mp4', // full path to file,
      //     url: 'the-website-url-download-the-video.mp4',
      //     size: '94 Mb', // full size in mb
      //     lastTry: '17/05/2016 9:06 AM', // last attempt at downloading the file
      //     downloaded: '5 MB',
      //     status: 'Paused', // can have values as 'Starting', 'Paused', 'Downloading', 'Error', 'Canceled', 'Done',
      //     selected: true // or false for checkbox and other use cases
      // },
    ],
    rowNumber: -1,
    rowPosition: 129
  }

  onShowActions = (rowNumber) => {
    let setPosition = 0
    if (rowNumber > 0) {
      setPosition = 128.5 + (rowNumber * 51)
    }
    else {
      setPosition = 129
    }
    this.setState({
      actionHolder: true,
      rowNumber: rowNumber,
      rowPosition: setPosition
    })
  }

  onHideActions = () => {
    if (!this.refs.actionMenu.state.open) {
      this.setState({
        actionHolder: false
      })
    }
  }

  // menu item click action
  onToolbarButton = (type) => {
    let sendTableData = JSON.parse(JSON.stringify(this.state.tableData))
    sendTableData[this.state.rowNumber].selected = true
    switch (type) {
      case 'resume':
      ToolbarActions.onResumeDownload(sendTableData, this.context.downloadProcesses)
      break
      case 'pause':
      ToolbarActions.onPauseDownload(sendTableData, this.context.downloadProcesses)
      break
      case 'redownload':
      ToolbarActions.onRedownloadFile(sendTableData)
      break
      case 'info':
      ToolbarActions.onRequestFileInfo(sendTableData)
      break
      case 'clear':
      ToolbarActions.onRemoveFromList(sendTableData)
      break
      case 'delete':
      ToolbarActions.onDeleteFromDisk(sendTableData)
      break
      default:
    }
  }

  // register all adding stuff here
  componentWillMount() {
    // load all the settings
    stored = settingsHandle.stored
    // update the local data
    this.setState({tableData: stored.dldata.data})
  }

  onShowPlaceholder = () => {
    // if table's length is zero show the EmptyPlaceHolder and hide the table
    if (!this.state.tableData.length) {
      this.setState({table: false})
      setTimeout(() => {
        this.refs.allPlaceHolder.setState({visible: true})
      }, 700)
    }
    else {
      this.setState({table: true})
      setTimeout(() => {
        this.refs.allPlaceHolder.setState({visible: false})
      }, 700)
    }
  }

  // show or hide the table function
  componentDidMount() {
    this.onShowPlaceholder()
    // add emitter event listener
    Subscriptions.push(mrEmitter.addListener('onUpdateData', (updateData) => {
      this.setState({tableData: updateData})
      setTimeout(() => {
        this.onShowPlaceholder()
      }, 300)
    }))
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
        top: `${this.state.rowPosition}px`,
        right: 0,
        marginRight: '8px'
      },
      actionMenu: {
        width: 200,
      }
    }

    return (
      <div onMouseLeave={this.onHideActions}>
        <Table
          ref="table"
          style={style.table}
          selectable={false}
          onRowHover={this.onShowActions}
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
              <TableRow
                ref={`tableRow${index}`}
                key={index}
              >
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
        <div
          onMouseOver={this.onKeepOpenActions}
          style={style.actionHolder}
          ref="actionHolder"
        >
          <IconButton
            onTouchTap={() => this.onToolbarButton('resume')}
            style={style.actionButton}
            tooltip="Resume"
          >
            <Play />
          </IconButton>
          <IconButton
            onTouchTap={() => this.onToolbarButton('pause')}
            style={style.actionButton}
            tooltip="Pause"
          >
            <Pause />
          </IconButton>
          <IconButton
            onTouchTap={() => this.onToolbarButton('clear')}
            style={style.actionButton}
            tooltip="Remove from list"
          >
            <Delete />
          </IconButton>
          <IconMenu
            ref="actionMenu"
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
            <MenuItem
              onTouchTap={() => this.onToolbarButton('redownload')}
              primaryText="Redownload"
            />
            <MenuItem
              onTouchTap={() => this.onToolbarButton('info')}
              primaryText="File Info"
            />
            <MenuItem
              onTouchTap={() => this.onToolbarButton('delete')}
              primaryText="Delete from disk"
            />
          </IconMenu>
        </div>
        <AllPlaceHolder ref="allPlaceHolder" />
      </div>
    )
  }
}

All.contextTypes = {
  downloadProcesses: PropTypes.array.isRequired
}
