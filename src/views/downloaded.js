import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const tableData = [
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

const style = {
  whiteSpace: 'normal'
}

export default class Downloaded extends React.Component {
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
                <TableRowColumn style={style}>{row.fileName}</TableRowColumn>
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
