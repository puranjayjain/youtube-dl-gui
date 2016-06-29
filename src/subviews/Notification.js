// notofications display component
import React, {PropTypes, Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// import necessary components
import Tooltip from 'material-ui/internal/Tooltip'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

// import node youtube dl and related dependencies
import moment from 'moment'

// icons
import Info from 'material-ui/svg-icons/action/info'

// the settings loader helper
import SettingsHandler from '../helpers/SettingsHandler'

let settingsHandle = new SettingsHandler(),
stored = {}

export default class Notification extends Component {
  //keep tooltip state
  state = {
    // checkbox state of the main dialog checkbox
    authentication: false,
  }

  render() {
    const style = {
      fab: {
        position: 'fixed',
        bottom: 25,
        right: 20,
        visibility: this.state.fab ? 'visible' : 'collapse',
        zIndex: 2
      },
      tooltip: {
        position: 'fixed',
        top: 'calc(100% - 100px)',
        right: 15
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
        marginLeft: 8,
        marginBottom: 8
      },
      format: {
        marginLeft: -24,
        width: 550,
        overflow: 'hidden'
      },
      initLoader: {
        visibility: this.state.initLoader ? 'visible' : 'collapse'
      }
    }

    return (
      <div>
        joy
      </div>
    )
  }
}

Notification.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
