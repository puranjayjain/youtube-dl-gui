// looks empty placeholder for no videos in list with animations
import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper'

import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'

export default class EmptyPlaceHolder extends React.Component {
  state = {
    emptyPlaceHolder: false
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
        opacity: this.state.emptyPlaceHolder ? '1' : '0'
      },
      icon: {
        height: '18vh',
        width: '18vh',
        fill: this.context.muiTheme.palette.amber500Color,
        color:  this.context.muiTheme.palette.amber500Color
      }
    }

    return (
      <ReactCSSTransitionGroup transitionName="downloadedAnimate" transitionEnterTimeout={200} transitionLeaveTimeout={200} transitionAppear={true}>
        <Paper
          key={this.state.emptyPlaceHolder}
          circle={true}
          style={style.backdrop}
        >
          <CreateNewFolder style={style.icon} />
          looks empty to me
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}

EmptyPlaceHolder.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
