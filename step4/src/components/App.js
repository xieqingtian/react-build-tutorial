import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import './app.less'


const A = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'yellow' }}>

        </div>
    )
}

const B = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'red' }}>

        </div>
    )
}

const C = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'green' }}>

        </div>
    )
}

const Fade = ({ children, ...props }) => (
    <CSSTransition
        classNames="fade"
        timeout={500}
        {...props}
    >
        {children}
    </CSSTransition>
)


const mapStateToProps = (state, ownProps) => {
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    linkToA: () => dispatch(push('/a')),
    linkToB: () => dispatch(push('/b')),
    linkToC: () => dispatch(push('/c')),
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

    state = {
        show: false
    }

    render() {

        const { pathname } = this.props.router.location

        return (
            <div>
                <Fade key="/" in={pathname === '/'}><Route key={pathname} exact path="/" component={A} /></Fade>
                <Fade key="/a" in={pathname === 'a'}><Route key={pathname} exact path="/a" component={A} /></Fade>
                <Fade key="/b" in={pathname === 'b'}><Route key={pathname} exact path="/b" component={B} /></Fade>
                <Fade key="/c" in={pathname === 'c'}><Route key={pathname} exact path="/c" component={C} /></Fade>
                <button onClick={() => this.props.linkToA()}>A</button>
                <button onClick={() => this.props.linkToB()}>B</button>
                <button onClick={() => this.props.linkToC()}>C</button>
            </div>
        )
    }
}

export default App