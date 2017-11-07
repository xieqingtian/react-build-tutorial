import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Login from './Login'
import Home from './Home'

const Nav = () => (
    <div>
        <NavLink exact activeStyle={{ color: 'red' }} to="/">
            /
        </NavLink>
        <span>--------</span>
        <NavLink exact activeStyle={{ color: 'red' }} to="/home">
            home
        </NavLink>
    </div>
)

const App = () => (
    <div>
        <Nav />
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
        </Switch>
    </div>
)

export default App
