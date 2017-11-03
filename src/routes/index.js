import React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, withRouter } from 'react-router-dom'
import Login from './Login'
import Home from './Home'

const App = props => (
    <div>
        <NavLink exact activeStyle={{ color: 'red' }} to="/">
            /
        </NavLink>
        <span>--------</span>
        <NavLink exact activeStyle={{ color: 'red' }} to="/home">
            home
        </NavLink>
        <Router basename="/">
            <Switch location={props.location}>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
            </Switch>
        </Router>
    </div>
)

export default withRouter(App)
