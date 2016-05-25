import React from 'react'
const shell = window.require('electron').shell
const clipboard = window.require('electron').clipboard
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

// import all the errors to be used
import Errordata from '../Data/Errordata'

// remove this subscription afterwards when there is no use for it
let Subscription = null

// standard regex for matching the urls
// see http://www.regexr.com/3ajfi
const urlPattern = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/

export default class Addurl extends React.Component {
  //keep tooltip state
  state = {
    // checkbox state of the main dialog checkbox
    authentication: false,
    // tooltip state for the info button in the main dialog
    tooltipShown: false,
    // main dialog display state
    dialog: false,
    // confirm dialog display state
    confirmDialog: false,
    // main fab display state
    fab: true,
    // to store the url in the input of the main dialog
    url: '',
    // to store the error text in the input of the main dialog
    errorUrl: '',
  }

  // click to open the Dialog
  openDownloadDialog = () => {
    this.setState({dialog: true})
    // check if the clipboard has a url (if yes paste it)
    let text = clipboard.readText(String).split('\n')[0]
    if (urlPattern.test(text)) {
      this.setState({url: text})
    }
    // focus the url input
    setTimeout(() => {
      this.refs.urlInput.focus()
    }, 300)
  }

  // on change event of the url input in the main dialog
  setUrl = (event) => {
    this.setState({url: event.target.value})
  }

  // ok button the main dialog
  onOkDialog = () => {
    let text = this.state.url.split('\n')[0]
    // check if there is a url and it is valid
    if (urlPattern.test(text)) {
      this.setState({
        dialog: false,
        confirmDialog: true
      })
    }
    else {
      this.setState({errorUrl: Errordata.invalidUrl})
    }
  }

  // close the dialog
  closeDownloadDialog = () => {
    this.setState({dialog: false})
  }

  // close the confirm dialog
  closeConfirmDialog = () => {
    this.setState({confirmDialog: false})
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

  // main dialog actions
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.closeDownloadDialog}
    />,
    <FlatButton
      label="Ok"
      primary={true}
      onTouchTap={this.onOkDialog}
    />
  ]

  // confirm download dialog
  const confirmActions = [
   <FlatButton
     label="Cancel"
     primary={true}
     onTouchTap={this.closeConfirmDialog}
   />,
   <FlatButton
     label="Start"
     primary={true}
     onTouchTap={this.closeConfirmDialog}
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
          value={this.state.url}
          hintText="e.g. https://www.youtube.com/watch?v=foE1mO2yM04"
          floatingLabelText="Enter or Paste the video url here"
          errorText={this.state.errorUrl}
          onChange={this.setUrl}
        />
        <Card
          expanded={this.state.authentication}
          onExpandChange={this.onAuthenticationCheck}
        >
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
      <Dialog
        title={
          <div style={style.dialogTitle}>
            Download a video or a playlist (if supported)
          </div>
        }
        actions={confirmActions}
        open={this.state.confirmDialog}
        onRequestClose={this.closeConfirmDialog}
      >
        yoyo
      </Dialog>
    </div>
    )
  }
}

Addurl.contextTypes = {
  location: React.PropTypes.object.isRequired
}
