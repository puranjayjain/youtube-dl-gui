import React from 'react'

// import necessary components
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Tooltip from 'material-ui/internal/Tooltip'

// icons
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
  fab: {
    position: 'fixed',
    bottom: '25px',
    right: '20px',
    zIndex: 2
  },
  tooltip: {
    position: 'fixed',
    top: 'calc(100% - 100px)',
    right: '15px'
  }
}

export default class Main extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  //keep tooltip state
  state = {
    tooltipShown: false,
  }

  // click to open the Dialog
  openDownloadDialog = () => {

  }

  render() {
    return (
        <div>
          <FloatingActionButton
            secondary={true}
            style={style.fab}
            onTouchTap={this.openDownloadDialog}
            onMouseEnter={()=>{this.setState({tooltipShown: true})}}
            onMouseLeave={()=>{this.setState({tooltipShown: false})}}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Tooltip
            show={this.state.tooltipShown}
            label={"Download from a new URL"}
            style={style.tooltip}
            horizontalPosition="left"
            verticalPosition="top"
            touch={true}
          />
        </div>
    )
  }
}
