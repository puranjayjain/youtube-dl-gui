import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const tableData = [
  {
    fileName: 'John Smith',
    downloaded: 'Employed',
    status: 'downloading',
    size: '94 Mb',
    lastTry: '17/05/2016'
  },
  {
    fileName: 'John Smith',
    downloaded: 'Employed',
    status: 'downloading',
    size: '94 Mb',
    lastTry: '17/05/2016'
  }
]

export default class All extends React.Component {
  render() {
    return (
      <div>
        <Table
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
                <TableRowColumn>{row.fileName}</TableRowColumn>
                <TableRowColumn>{row.downloaded}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.size}</TableRowColumn>
                <TableRowColumn>{row.lastTry}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          >
        </Table>
      </div>
    )
  }
}
