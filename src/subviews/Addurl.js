// Add button for the url and also the common element for rendering fab, snackbar among common elements
import React, {PropTypes, Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const {dialog, app, shell, clipboard} = window.require('electron').remote

// import necessary components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CircularProgress from 'material-ui/CircularProgress'
import DropDownMenu from 'material-ui/DropDownMenu'
import CommonDialog from '../subviews/CommonDialog'
import RaisedButton from 'material-ui/RaisedButton'
import Tooltip from 'material-ui/internal/Tooltip'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'

// import node youtube dl and related dependencies
import Dl from '../helpers/Dl'
import uuid from 'uuid'
import moment from 'moment'

// icons
import MoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Info from 'material-ui/svg-icons/action/info'

import mrEmitter from '../helpers/mrEmitter'
import VersionChecker from '../helpers/VersionChecker'

// import all the errors to be used
import {ErrorData} from '../Data/Messagedata'

// standard regex for matching the urls
// see https://gist.github.com/dperini/729294
const urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let settingsHandle = new SettingsHandler(),
stored = {},
// remove this subscription afterwards when there is no use for it
Subscriptions = [],
// youtube dl format array will be stored here
youtubedlFormat,
// to track if the video formats are to be loaded this time
loadFormat = true,
// current error in the snackbar
snackbarErrorText = '',
// to store the currently downloaded progress
tableData = {}

export default class Addurl extends Component {
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
    // username and password from the first dialog
    username: '',
    password: '',
    // to store error text for file path
    errorPath: '',
    // init loader visibility
    initLoader: true,
    // path to file save
    filePath: '',
    // the downloadable formats state
    format: 1,
    // dropdown values
    formats: [],
    // format detailed information
    formats_info: [],
    // store extensions
    extensions: [],
    // start button for Confirmation dialog's disabled props state
    start: true,
    // replace fileName
    replaceFilename: '',
    // errors snackbar state
    errorSnackbar: false,
    // snackbar action text
    actionText: '',
    // function to call with the action button on click
    actionFunc: this.noop
  }

  // no operation function
  noop = () => {}

  // filter and show only downloading files
  filterDownloader = (data) => {
    if ('status' in data && typeof(data.status) === 'string' && data.status === 'Downloading') {
      return true
    }
    else {
      return false
    }
  }

  // keep unique elements only
  // http://stackoverflow.com/questions/1960473/unique-values-in-an-array
  filterUnique = (value, index, self) => self.indexOf(value) === index

  /**
  * [click to open the Dialog]
  * @method
  * @param  {Boolean} external = false [if set true it means that the dialog was opened from the outside link]
  */
  openDownloadDialog = (event, external = false) => {
    this.setState({dialog: true})
    // set loadFormats to true to tell that the formats are to be refetched
    loadFormat = true
    // reset the error
    this.setState({errorUrl: ''})
    // check if the clipboard has a url (if yes paste it)
    let text = clipboard.readText(String).split('\n')[0]
    // if the external parameter was passed do nothing
    if (!external) {
      if (urlPattern.test(text)) {
        this.setState({url: text})
      }
      else {
        // empty the text if not a url
        this.setState({url: ''})
      }
    }
    // focus the url input
    setTimeout(() => {
      this.refs.urlInput.focus()
    }, 300)
  }

  // on change event of the url input in the main dialog
  setText = (event, state) => this.setState({[state]: event.target.value})

  // ok button the main dialog
  onOkDialog = () => {
    let text = this.state.url.split('\n')[0]
    // check if there is a url and it is valid
    if (urlPattern.test(text)) {
      this.setState({
        dialog: false,
        confirmDialog: true,
        errorUrl: ''
      })
      // trigger format loader
      this.loadFormat()
    }
    else {
      this.setState({errorUrl: ErrorData.invalidUrl})
    }
  }

  /**
  * [open the snackbar]
  * @method
  * @param  {String} text [the text to be displayed]
  */
  openSnackBar = (text) => {
    // handle errors as toasts here
    snackbarErrorText = text
    // display the snackbar
    this.setState({
      errorSnackbar: true,
      actionText: '',
      actionFunc: this.noop
    })
  }

  /**
  * [snackbar with action text]
  * @method
  * @param  {String} text                  [the text to be displayed]
  * @param  {String} action                [the text to be displayed as the action button]
  * @param  {Callback function} actionFunc [the function to call when the action button is clicked]
  */
  openActionSnackBar = (text, action, actionFunc) => {
    // handle errors as toasts here
    snackbarErrorText = text
    // display the snackbar
    this.setState({
      errorSnackbar: true,
      actionText: action,
      actionFunc: actionFunc
    })
  }

  // store the download data back to storage
  setDataChange = (updateData) => {
    settingsHandle.setStored('dldata', updateData)
    this.setComponentState('errorSnackbar', false)
    // emits on download start / resume to update the useful stuff
    mrEmitter.emit('onUpdateData', updateData)
  }

  // set the new state of the component
  setComponentState = (component, state) => this.setState({[component]: state})

  /**
  * [on any input's keypress]
  * @method
  * @param  {Event}   event     [Event for the text input]
  * @param  {Function} callback [function to call on success]
  * @return {[type]}
  */
  onTextKeyPress = (event, callback) => {
    // if key code matches move to next one
    if (event.keyCode === 13) {
      callback()
    }
  }

  // close the confirm dialog
  closeConfirmDialog = () => {
    this.setState({
      confirmDialog: false,
      // reset to default as the format
      format: 1,
      // clear the downloaded formats
      formats: [],
      extensions: [],
      // reset the error states
      errorPath: '',
      initLoader: true,
      start: true,
      filePath: '',
      replaceFilename: ''
    })
  }

  // get dl js options
  getDlOptions = (id) => {
    let dlO = {
      uuid: id,
      url: this.state.url,
      filePath: this.state.filePath,
      format: this.state.format === 1 ? false : this.state.formats_info[this.state.format - 2].format_id
    }
    // if the username options are to be used
    if (this.state.username && this.state.password && this.state.authentication) {
      dlO.username = this.state.username
      dlO.password = this.state.password
    }
    return dlO
  }

  // ok button of the confirm dialog
  onConfirmDialog = () => {
    let tempPath = this.state.filePath
    tempPath = path.dirname(tempPath)
    // check if the path passed by the user is valid
    pathExists(tempPath).then(exists => {
      if (exists) {
        // generate the download id and use it
        const id = uuid.v1()
        // begin procedure to download the media
        let downloadProcess = new Dl(this.getDlOptions(id))
        // initiate the object to store
        let newDownload = {
          uuid: id,
          format_id: this.state.format === 1 ? false : this.state.formats_info[this.state.format - 2].format_id, // format id(number) of the download
          url: this.state.url, //url of the media
          fileName: this.state.filePath,
          size: 0, // e.g 459834 bytes converted to mb when displayed, full size of download
          lastTry: moment(), // last attempt at downloading the file
          downloaded: 0, // e.g 459834 bytes converted to mb when displayed, bytes downloaded
          status: 'Starting'
        }

        // update the localstorage data
        let updateData = stored.dldata.data
        // push new data to the start of the array
        updateData.unshift(newDownload)
        settingsHandle.setStored('dldata', updateData)
        // add internal states for use
        newDownload.downloadProcess = downloadProcess
        // initialze the download process
        downloadProcess.initVideo()

        // update the contextual storage
        this.context.downloadProcesses.unshift(newDownload)
        // close the dialog now
        this.closeConfirmDialog()
      }
      else {
        this.setState({errorPath: ErrorData.invalidPath})
      }
    })
  }

  // on info button click
  onInfoButton = () => shell.openExternal('https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md')

  // authentication checkbox
  onAuthCheck = () => this.setState({authentication: !this.state.authentication})

  // handle expansion panel or the card
  onAuthenticationCheck = (check) => this.setState({authentication: check})

  // check if the page should have the fab or no
  isActive = (to) => {
    let newState
    if (to === '/' || to === '/downloading' || to === '/downloaded' || to === '/unfinished') {
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

  // change the dropdown value for the format dropdown
  handleFormat = (event, index, value) => {
    this.setState({format: value})
    // change file extension and stored extension if it is required
    if (this.state.filePath && index > 1) {
      this.setState({filePath: this.state.filePath.replace(path.extname(this.state.filePath), `.${this.state.formats_info[index - 1].ext}`)})
    }
    // change filenname
    if (this.state.replaceFilename && index > 1) {
      this.setState({replaceFilename: this.state.replaceFilename.replace(path.extname(this.state.replaceFilename), `.${this.state.formats_info[index - 1].ext}`)})
    }
  }

  // on requesting information for format and file
  loadFormat = () => {
    const url = this.state.url
    // only do this if the formats were not triggered at this request
    if (loadFormat) {
      // async get the information of the requested file
      youtubedl.getInfo(url, (error, info) => {
        if (error) {
          console.error(error)
          // handle errors as toasts here
          this.openSnackBar(ErrorData.errorFormat)
          return
        }
        // if the format is not available
        if (info.hasOwnProperty('formats')) {
          // store all the media formats in here
          youtubedlFormat = info.formats
          // also update the dialog with these values
          let formatList = [],
          extensions = []
          for (let f of youtubedlFormat) {
            formatList.push(`${f.format.split(' - ')[1]} [.${f.ext}] codec(a+v): ${f.acodec}+${f.vcodec}} @${f.abr ? f.abr : 'N/A'}+${f.vbr ? f.vbr : 'N/A'}`)
            extensions.push(f.ext)
          }
          // set the dropdown items
          this.setState({
            formats: formatList,
            formats_info: youtubedlFormat,
            replaceFilename: info._filename,
            start: false,
            extensions: extensions.filter(this.filterUnique)
          })
          // set that the formats were loaded
          loadFormat = false
        }
        else {
          // handle errors as toasts here
          this.openSnackBar(ErrorData.errorFormat)
        }
        // set the loader off
        this.setState({initLoader: false})
      })
    }
  }

  // set or update the file save path
  pickFilePath = () => {
    const userPath = dialog.showSaveDialog({
      title: 'Save media in location',
      defaultPath: this.state.filePath ? this.state.filePath : this.state.replaceFilename,
      filters: [{name: 'Formats', extensions: this.state.extensions}]
    })
    if (userPath) {
      this.setState({filePath: path.join(path.dirname(userPath), this.state.replaceFilename)})
    }
  }

  // register all adding stuff here
  // set all the downloading data to error status
  componentWillMount() {
    let updateData = settingsHandle.stored.dldata.data
    // change downloading status to error on load
    for (let cData of updateData) {
      if (cData.status === 'Downloading') {
        cData.status = 'Error'
      }
    }
    // load all the settings
    stored = settingsHandle.stored
    // load ytdl version
    settingsHandle.loadYtdlVersion()
    // check for youtube dl version
    VersionChecker.checkVersion()
    // store it back
    settingsHandle.setStored('dldata', updateData)
    // emits on download start / resume to update the useful stuff
    mrEmitter.emit('onUpdateData', updateData)
    // on initiate load
    this.isActive(this.context.location.pathname)
    // reset progressBar on load
    ipcRenderer.send('progressBar', -1)
    // on update of getting a new download byte
    Subscriptions.push(mrEmitter.addListener('onUpdateData', (updateData) => {
      // do this only if the requirement is
      if (stored.desktop.status.data) {
        tableData = stored.dldata.data.filter(this.filterDownloader)
        // for each through them and get the download bytes ratio of total
        let downloadedBytes = 0,
        totalBytes = 0
        for (let cData of tableData) {
          downloadedBytes += cData.downloaded
          totalBytes += cData.size
        }
        // set them to the main process
        // from https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript/12830454#12830454
        ipcRenderer.send('progressBar', +(downloadedBytes/totalBytes).toFixed(1))
      }
    }))
    // on each event triggeronStartDownload
    Subscriptions.push(mrEmitter.addListener('onRouteChange', (newLocation) => this.isActive(newLocation)))
    // show error text
    Subscriptions.push(mrEmitter.addListener('onShowError', (error) => this.openSnackBar(error)))
    // Toolbar action of restart, for update complete
    Subscriptions.push(mrEmitter.addListener('onYoutubeDlUpdate', (message) => this.openActionSnackBar(message, 'restart', () => location.reload())))
    // Toolbar action of removing items from list => display snackbar
    Subscriptions.push(mrEmitter.addListener('onClearList', (count, originalTableData) => this.openActionSnackBar(`${count} removed from List`, 'undo', this.setDataChange.bind(this, originalTableData))))
    // add to downloadProcesses
    Subscriptions.push(mrEmitter.addListener('onStartDownload', (newDownload) => this.context.downloadProcesses.unshift(newDownload)))
    // remove the download process
    Subscriptions.push(mrEmitter.addListener('onRemoveDownloadProcess', (uuid) => {
      for (let i in this.context.downloadProcesses) {
        if (this.context.downloadProcesses[i].uuid === uuid) {
          this.context.downloadProcesses = this.context.downloadProcesses.splice(i, 1)
        }
      }
    }))
    // to redownload a file event
    Subscriptions.push(mrEmitter.addListener('onRedownloadFile', (fileData) => {
      if (urlPattern.test(fileData.url)) {
        // copy text to the url input of the dialog
        this.setState({url: fileData.url})
        // open the dialog
        this.openDownloadDialog(event, true)
      }
    }))
    // add event listeners to trigger file download if necessary
    window.ondragover = window.ondragleave = window.ondragend = () => false
    window.ondrop = (event) => {
      event.preventDefault()
      // capture dropped urls and start download process if a url
      const dropUrl = event.dataTransfer.getData("text/plain")
      if (urlPattern.test(dropUrl)) {
        // copy text to the url input of the dialog
        this.setState({url: dropUrl})
        // open the dialog
        this.openDownloadDialog(event, true)
      }
    }
  }

  // unregister all references here
  componentWillUnmount() {
    // remove emitter event listeners
    for (let Subscription of Subscriptions) {
      Subscription.remove()
    }
    // remove window event listeners
    window.ondragover = window.ondragleave = window.ondragend = window.ondrop = null
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
      },
      confirmDiv: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end'
      },
      fileText: {
        flex: 1
      },
      fileButton: {
        marginLeft: '8px',
        marginBottom: '8px'
      },
      format: {
        marginLeft: '-24px',
        width: '550px',
        overflow: 'hidden'
      },
      initLoader: {
        visibility: this.state.initLoader ? 'visible' : 'collapse'
      }
    }

    // main dialog actions
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setComponentState('dialog', false)}
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
        onTouchTap={this.onConfirmDialog}
        disabled={this.state.start}
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
          onRequestClose={() => this.setComponentState('dialog', false)}
        >
          <TextField
            ref="urlInput"
            style={style.urlInput}
            value={this.state.url}
            hintText="e.g. https://www.youtube.com/watch?v=foE1mO2yM04"
            floatingLabelText="Enter or Paste the video url here"
            errorText={this.state.errorUrl}
            onChange={(event) => this.setText(event, 'url')}
            onKeyDown={(event) => this.onTextKeyPress(event, this.onOkDialog)}
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
                value={this.state.username}
                onChange={(event) => this.setText(event, 'username')}
                style={style.authUser}
                floatingLabelText="Username"
              />
              <TextField
                value={this.state.password}
                onChange={(event) => this.setText(event, 'password')}
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
              Confirm download options
              <CircularProgress style={style.initLoader} />
            </div>
          }
          actions={confirmActions}
          open={this.state.confirmDialog}
          onRequestClose={this.closeConfirmDialog}
        >
          <div style={style.confirmDiv}>
            <TextField
              value={this.state.filePath}
              style={style.fileText}
              errorText={this.state.errorPath}
              hintText="e.g. C:\Users\User\Videos"
              floatingLabelText="Path to save file"
              onChange={(event) => this.setText(event, 'filePath')}
              onKeyDown={(event) => this.onTextKeyPress(event, this.onConfirmDialog)}
            />
            <RaisedButton
              style={style.fileButton}
              icon={<MoreHoriz />}
              primary={true}
              disabled={this.state.start}
              onTouchTap={this.pickFilePath}
            />
          </div>
          <DropDownMenu
            autoWidth={false}
            style={style.format}
            value={this.state.format}
            onChange={this.handleFormat}
          >
            <MenuItem value={1} primaryText="Default format" />
            {this.state.formats.map( (row, index) => (
              <MenuItem
                key={index}
                value={index + 2}
                primaryText={row} />
            ))}
          </DropDownMenu>
        </Dialog>
        <CommonDialog />
        <Snackbar
          open={this.state.errorSnackbar}
          message={snackbarErrorText}
          action={this.state.actionText}
          onActionTouchTap={this.state.actionFunc}
          autoHideDuration={4000}
          onRequestClose={() => this.setComponentState('errorSnackbar', false)}
        />
      </div>
    )
  }
}

Addurl.contextTypes = {
  location: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  downloadProcesses: PropTypes.array.isRequired
}
