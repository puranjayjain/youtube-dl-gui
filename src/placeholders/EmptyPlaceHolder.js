// looks empty placeholder for no videos in list with animations
import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper'

import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'

export default class EmptyPlaceHolder extends React.Component {
  constructor(props, context) {
    super(props, context)
    console.log(this);
  }

  state = {
    emptyPlaceHolders: false
  }

  render() {
    const style = {
      backdrop: {
        background: this.context.muiTheme.palette.primary1Color,
        position: 'absolute',
        height: '50vh',
        width: '50vh',
        background: this.context.muiTheme.palette.primary1Color,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      icon: {
        height: '18vh',
        width: '18vh',
        fill: this.context.muiTheme.palette.amber500Color,
        color:  this.context.muiTheme.palette.amber500Color
      }
    }

    return (
        <ReactCSSTransitionGroup transitionName="toolbarAnimate" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          <Paper
            key={this.state.emptyPlaceHolders}
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
