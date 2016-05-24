import React from 'react'
const shell = window.require('electron').shell
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// import necessary components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Tooltip from 'material-ui/internal/Tooltip'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'

// icons
import ContentAdd from 'material-ui/svg-icons/content/add'
import Info from 'material-ui/svg-icons/action/info'

import mrEmitter from '../helpers/mrEmitter'

// remove this subscription afterwards when there is no use for it
let Subscription = null

export default class Addurl extends React.Component {
  //keep tooltip state
  state = {
    authentication: false,
    tooltipShown: false,
    dialog: false,
    fab: true
  }

  // click to open the Dialog
  openDownloadDialog = () => {
    this.setState({dialog: true})
    // focus the url input
    setTimeout(() => {
      this.refs.urlInput.focus()
    }, 300)
  }

  // close the dialog
  closeDownloadDialog = () => {
    this.setState({dialog: false})
  }

  // on info button click
  onInfoButton = () => {
    shell.openExternal('https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md')
  }

  // authentication checkbox
  onAuthCheck = () => {
    this.setState({
      authentication: !this.state.authentication
    })
  }

  // handle expansion panel or the card
  onAuthenticationCheck = (check) => {
    this.setState({authentication: check})
  }

  // check if the page should have the fab or no
  isActive = (to) => {
    let newState
    console.log(to);
    if (to === '/' || to === '/downloading' || to === '/downloaded') {
      newState = true
    }
    else {
      newState = false
    }
    // don't update state if already the right one
    if (newState !== this.state.fab) {
      this.setState({fab: newState})
    }
  }

  // register all adding stuff here
  componentWillMount() {
    // on initiate load
    this.isActive(this.context.location.pathname)
    // on each event trigger
    Subscription = mrEmitter.addListener('onRouteChange', (newLocation) => {
      this.isActive(newLocation)
    });
  }

  // unregister all references here
  componentWillUnmount() {
    Subscription.remove()
  }

  render() {
    const style = {
    fab: {
      position: 'fixed',
      bottom: '25px',
      right: '20px',
      visibility: this.state.fab ? 'visible' : 'collapse',
      zIndex: 2
    },
    tooltip: {
      position: 'fixed',
      top: 'calc(100% - 100px)',
      right: '15px'
    },
    dialogTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    urlInput: {
      width: '100%'
    },
    authCover: {
      display: 'flex'
    },
    authUser: {
      marginRight: '1em',
      flex: 1
    },
    authPass: {
      flex: 1
    }
  }

    // dialog actions
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.closeDownloadDialog}
    />,
    <FlatButton
      label="Ok"
      primary={true}
      onTouchTap={this.closeDownloadDialog}
    />
  ]

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="downloadedAnimate"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200} 
        transitionAppear={true}
        transitionAppearTimeout={200}
      >
        <FloatingActionButton
          secondary={true}
          key={this.state.fab}
          style={style.fab}
          onTouchTap={this.openDownloadDialog}
          onMouseEnter={()=>{this.setState({tooltipShown: true})}}
          onMouseLeave={()=>{this.setState({tooltipShown: false})}}
        >
          <ContentAdd />
        </FloatingActionButton>
      </ReactCSSTransitionGroup>
      <Tooltip
        show={this.state.tooltipShown}
        label={"Download from a new URL"}
        style={style.tooltip}
        horizontalPosition="left"
        verticalPosition="top"
        touch={true}
      />
      <Dialog
        title={
          <div style={style.dialogTitle}>
            <span>
              Download a video or a playlist (if supported)
            </span>
            <IconButton
              tooltip="More Information regarding list of supported formats and websites"
              onTouchTap={this.onInfoButton}
            >
              <Info />
            </IconButton>
          </div>
        }
        actions={actions}
        open={this.state.dialog}
        onRequestClose={this.closeDownloadDialog}
      >
        <TextField
          ref="urlInput"
          style={style.urlInput}
          hintText="e.g. https://www.youtube.com/watch?v=foE1mO2yM04"
          floatingLabelText="Enter or Paste the video url here"
        />
        <Card expanded={this.state.authentication} onExpandChange={this.onAuthenticationCheck}>
          <CardText>
            <Checkbox
              onCheck={this.onAuthCheck}
              checked={this.state.authentication}
              label="Enable Authentication"
            />
          </CardText>
          <CardText
            expandable={true}
            style={style.authCover}
          >
            <TextField
              ref="username"
              style={style.authUser}
              floatingLabelText="Username"
            />
            <TextField
              ref="password"
              floatingLabelText="Password"
              style={style.authPass}
              type="password"
            />
          </CardText>
        </Card>
      </Dialog>
    </div>
    )
  }
}

Addurl.contextTypes = {
  location: React.PropTypes.object.isRequired
}
