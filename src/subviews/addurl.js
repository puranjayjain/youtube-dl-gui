import React from 'react'

// import necessary components
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Tooltip from 'material-ui/internal/Tooltip'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

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
    dialog: false
  }

  // click to open the Dialog
  openDownloadDialog = () => {
    this.setState({dialog: true})
  }

  // close the dialog
  closeDownloadDialog = () => {
    this.setState({dialog: false});
  }

  render() {
    // dialog actions
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]

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
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.dialog}
            onRequestClose={this.closeDownloadDialog}
          >
            The actions in this window were passed in as an array of React objects.
          </Dialog>
        </div>
    )
  }
}
