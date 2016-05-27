// looks empty placeholder for no videos in list with animations
import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper'

import Folder from 'material-ui/svg-icons/file/folder'

export default class DownloadedPlaceHolder extends React.Component {
  state = {
    visible: false
  }

  render() {
    const style = {
      backdrop: {
        background: this.context.muiTheme.palette.primary1Color,
        position: 'absolute',
        height: '50vh',
        width: '50vh',
        background: this.context.muiTheme.palette.primary1Color,
        left: 'calc(50% - 25vh)',
        top: 'calc(50% - 25vh)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        minWidth: '325px',
        minHeight: '325px',
        opacity: this.state.visible ? '1' : '0'
      },
      icon: {
        height: '18vh',
        width: '18vh',
        fill: this.context.muiTheme.palette.amber500Color,
        color:  this.context.muiTheme.palette.amber500Color
      },
      h2: {
        margin: '0 auto 0.43em 8.1vh'
      },
      h3: {
        marginTop: 0
      }
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="downloadedAnimate"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
        transitionAppear={true}
        transitionAppearTimeout ={200}
      >
        <Paper
          key={this.state.visible}
          circle={true}
          style={style.backdrop}
        >
          <Folder style={style.icon} />
          <h2 style={style.h2}>
            It's empty here
          </h2>
          <h3 style={style.h3}>
            Only downloaded files show here.
          </h3>
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}

DownloadedPlaceHolder.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
