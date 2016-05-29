import React from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const style = {
  margin: '12px'
}

export default class About extends React.Component {
  render() {
    const version = {
      node: "Node Js Version " + window.process.versions.node,
      chrome: "Chrome " + window.process.versions.chrome,
      electron: "Electron " + window.process.versions.electron
    }

    return (
       <Card style={style}>
         <CardHeader
           title="Youtube Dl GUI"
           subtitle="v0.0.1"
           avatar="http://lorempixel.com/100/100/nature/"
         />
         <CardText>
           <List>
             <ListItem primaryText={version.node} />
             <ListItem primaryText={version.chrome} />
             <ListItem primaryText={version.electron} />
           </List>
         </CardText>
       </Card>
    )
  }
}
