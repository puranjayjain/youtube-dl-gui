import React, {PropTypes, Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {fade} from 'material-ui/utils/colorManipulator'
import Checkbox from 'material-ui/Checkbox'

// icons
import Clear from 'material-ui/svg-icons/content/clear'
import Info from 'material-ui/svg-icons/action/info'
import Delete from 'material-ui/svg-icons/action/delete'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Play from 'material-ui/svg-icons/av/play-arrow'

import moment from 'moment'
import bytes from 'bytes'

// Custom components
import mrEmitter from '../helpers/mrEmitter'
import DownloadedPlaceHolder from '../placeholders/DownloadedPlaceHolder'
import ToolbarActions from '../helpers/ToolbarActions'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

// the component to render inside
let innerComp,
checkboxes = 0,
stored = {},
settingsHandle = new SettingsHandler(),
// remove this subscription afterwards when there is no use for it
Subscriptions = []

export default class Unfinished extends Component {
  state = {
    toolbar: false,
    table: true,
    tableData: [],
    // all checkbox state
    allChecked: false,
    // number of checked checkboxes
    checkedBoxes: 0,
    // selected text
    selectedText: "0 Selected"
  }

  /**
  * [toggle toolbar's visibility]
  * @param  {Boolean}   state    [new state of the toolbar]
  */
  onToggleToolbar = (state) => this.setState({toolbar: state})

  /**
  * [Event handler for select all checkbox]
  * @param  {Event}  event         [event]
  * @param  {Boolean} isInputChecked [tells if the input was checked or not]
  */
  onAllChecked = (event, isInputChecked) => {
    // get the temp  data
    let i, tempTableData = this.state.tableData
    for (i = 0; i < checkboxes; i++) {
      // update the data
      tempTableData[i].selected = isInputChecked
    }
    // if the inputs were all checked set the selected to all else to 0
    let selectedCheckboxes
    if (isInputChecked) {
      selectedCheckboxes = i
    }
    else {
      selectedCheckboxes = 0
    }
    // set the value to state
    this.setState({
      allChecked: isInputChecked,
      checkedBoxes: selectedCheckboxes,
      tableData: tempTableData,
      selectedText: `${selectedCheckboxes} Selected`
    })
    // update the toolbar
    this.onToggleToolbar(isInputChecked)
  }

  /**
  * [on checking of one of the checkboxes]
  * @method
  * @param  {Integer} index          [index of the checkbox in table from 0..n]
  * @param  {Event}   event          [passed event]
  * @param  {Boolean} isInputChecked [if the current input is checked or not]
  */
  onChecked = (index, event, isInputChecked) => {
    let tempState = this.state.tableData
    tempState[index].selected = isInputChecked
    // check if we need to show or hide the toolbar
    let shouldCheck = false
    for (let i = 0; i < checkboxes; i++) {
      if (this.state.tableData[i].selected) {
        shouldCheck = true
        break
      }
    }
    // if the inputs were all checked set the selected to all else to 0
    let selectedCheckboxes = this.state.checkedBoxes
    if (isInputChecked) {
      selectedCheckboxes++
    }
    else {
      selectedCheckboxes--
    }
    // set the value to state
    this.setState({
      checkedBoxes: selectedCheckboxes,
      tableData: tempState,
      selectedText: `${selectedCheckboxes} Selected`
    })
    // check if toolbar needs to be shown
    if (selectedCheckboxes > 0) {
      this.onToggleToolbar(true)
    }
    else {
      this.onToggleToolbar(false)
    }
  }

  // propogate checkbox tick from the table row to the relevant checkbox
  onClickTableCell = (rowNumber, columnId, event) => {
    if (event.target.nodeName !== 'INPUT') {
      this.onChecked(rowNumber, event, !this.state.tableData[rowNumber].selected)
    }
  }

  onToolbarButton = (type) => {
    switch (type) {
      case 'resume':
      ToolbarActions.onResumeDownload(this.state.tableData, this.context.downloadProcesses)
      break
      case 'redownload':
      ToolbarActions.onRedownloadFile(this.state.tableData)
      break
      case 'info':
      ToolbarActions.onRequestFileInfo(this.state.tableData)
      break
      case 'clear':
      ToolbarActions.onRemoveFromList(this.state.tableData)
      break
      case 'delete':
      ToolbarActions.onDeleteFromDisk(this.state.tableData)
      break
      default:
    }
  }

  // filter for this page
  filterDownloader = (data) => {
    if ('status' in data && typeof(data.status) === 'string' && (data.status === 'Canceled' || data.status === 'Error' || data.status === 'Paused' || data.status === 'Starting')) {
      return true
    }
    else {
      return false
    }
  }

  // close the toolbar
  onCloseToolbar = (e) => {
    // trigger all checked
    this.onAllChecked(e, false)
  }

  // register all adding stuff here
  componentWillMount() {
    // load all the settings
    stored = settingsHandle.stored
    // adding selected property to tableData
    let tempData = stored.dldata.data.filter(this.filterDownloader)
    for (let cData of tempData) {
      cData.selected = false
    }
    // update the local data
    this.setState({tableData: tempData})
  }

  onShowPlaceholder = () => {
    // if table's length is zero show the EmptyPlaceHolder and hide the table
    if (!this.state.tableData.length) {
      this.setState({table: false})
      this.allPlaceHolderTimeoutTrue = setTimeout(() => {
        this.refs.downloadedPlaceHolder.setState({visible: true})
      }, 700)
    }
    else {
      this.setState({table: true})
      this.allPlaceHolderTimeoutFalse = setTimeout(() => {
        this.refs.downloadedPlaceHolder.setState({visible: false})
      }, 700)
    }
  }

  // show or hide the table function
  componentDidMount() {
    this.onShowPlaceholder()
    // add emitter event listener
    // filter and keep only the ones that are 'downloaded'
    Subscriptions.push(
      mrEmitter.addListener('onUpdateData', (updateData) => {
        // adding selected property to tableData
        let tempData = updateData.filter(this.filterDownloader)
        for (let cData of tempData) {
          cData.selected = false
        }
        this.setState({tableData: tempData})
        this.onShowPlaceholderTimeout = setTimeout(() => {
          this.onShowPlaceholder()
        }, 300)
      }),
      // close the toolbar
      mrEmitter.addListener('onCloseToolbar', () => this.onAllChecked('', false))
    )
  }

  componentWillUnmount() {
    // cleanup timeouts
    clearTimeout(this.onShowPlaceholderTimeout)
    clearTimeout(this.allPlaceHolderTimeoutTrue)
    clearTimeout(this.allPlaceHolderTimeoutFalse)
    // remove emitter event listeners
    for (let Subscription of Subscriptions) {
      Subscription.remove()
    }
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
        paddingLeft: 32,
        height: 64,
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
        background: fade(this.context.muiTheme.palette.textColor, 0.5)
      },
      toolbarTitle1: {
        paddingLeft: '.5em',
        color: this.context.muiTheme.palette.textColor
      },
      redownload: {
        display: this.state.checkedBoxes === 1 ? 'flex' : 'none'
      },
      deleteForever: {
        background: this.context.muiTheme.palette.primary1Color,
        borderRadius: '50%'
      },
      tableColumn: {
        width: 24,
        paddingLeft: 20
      },
      table: {
        display: this.state.table ? 'table' : 'none'
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
                text={this.state.selectedText}
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton
                onTouchTap={() => this.onToolbarButton('resume')}
                tooltip="Resume"
              >
                <Play />
              </IconButton>
              <IconButton
                onTouchTap={() => this.onToolbarButton('redownload')}
                style={style.redownload}
                tooltip="Redownload"
              >
                <Refresh />
              </IconButton>
              <IconButton
                onTouchTap={() => this.onToolbarButton('info')}
                tooltip="Info"
              >
                <Info />
              </IconButton>
              <IconButton
                onTouchTap={() => this.onToolbarButton('clear')}
                tooltip="Remove from List"
              >
                <Delete />
              </IconButton>
              <IconButton
                onTouchTap={() => this.onToolbarButton('delete')}
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
          style={style.table}
          selectable={false}
          onCellClick={this.onClickTableCell}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={style.tableColumn}>
                <Checkbox
                  checked={this.state.allChecked}
                  onCheck={this.onAllChecked}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>File Name</TableHeaderColumn>
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
                <TableRowColumn style={style.tableColumn}>
                  <Checkbox
                    checked={row.selected}
                    onCheck={(event, isInputChecked) => this.onChecked(index, event, isInputChecked)}
                  />
                </TableRowColumn>
                <TableRowColumn style={style.multiLineItem}>{row.fileName}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{bytes(row.size)}</TableRowColumn>
                <TableRowColumn>{moment(row.lastTry).fromNow()}</TableRowColumn>
              </TableRow>
            ))}
            {
              // set the var to note the checkboxes value
              checkboxes = this.state.tableData.length
            }
          </TableBody>
          >
        </Table>
        <DownloadedPlaceHolder ref="downloadedPlaceHolder" />
      </div>
    )
  }
}

Unfinished.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  downloadProcesses: PropTypes.array.isRequired
}
