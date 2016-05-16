import React from 'react'
import { ReactDOM, render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'

// All the views and inner views
import Main from './Main'
import Settings from '../views/settings'

//Needed for onTouchTap
//Can go away when react 1.0 release
//NOTE https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// ReactDOM.render(<Main />, document.getElementById('app'))

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index!</h2>
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      // TODO add a first run logic to initiate the settings for the first time
      <IndexRoute component={Index}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
