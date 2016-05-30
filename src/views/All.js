import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

// Custom components
import AllPlaceHolder from '../placeholders/AllPlaceHolder'

import mrEmitter from '../helpers/mrEmitter'

const tableData = [
  // {
  //     uuid: 'uuid',
  //     fileName: 'C:\Users\User\Music\Song.mp4', // full path to file
  //     size: '94 Mb', // full size in mb
  //     lastTry: '17/05/2016 9:06 AM', // last attempt at downloading the file
  //     downloaded: '5 MB',
  //     status: 'Paused', // can have values as 'Paused', 'Downloading', 'Error', 'Done'
  // },
  // {
  //     uuid: 'uuid',
  //     fileName: 'C:\Users\User\Music\Song.mp4', // full path to file
  //     size: '94 Mb', // full size in mb
  //     lastTry: '17/05/2016 9:06 AM', // last attempt at downloading the file
  //     downloaded: '5 MB',
  //     status: 'Paused', // can have values as 'Paused', 'Downloading', 'Error', 'Done'
  // }
]

export default class All extends React.Component {
  state = {
    toolbar: false,
    table: true
  }
  // show or hide the table function
  componentDidMount() {
    // if table's length is zero show the EmptyPlaceHolder and hide the table
    if (!tableData.length) {
      this.setState({table: false})
      setTimeout(() => {
        this.refs.allPlaceHolder.setState({visible: true})
      }, 700)
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
    }

    return (
      <div>
        <Table
          ref="table"
          style={style.table}
          selectable={false}
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
            {tableData.map( (row, index) => (
              <TableRow>
                <TableRowColumn style={style.tableColumn}>{row.fileName}</TableRowColumn>
                <TableRowColumn>{row.downloaded}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.size}</TableRowColumn>
                <TableRowColumn>{row.lastTry}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          >
        </Table>
        <AllPlaceHolder ref="allPlaceHolder" />
      </div>
    )
  }
}
