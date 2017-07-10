import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import styles from './app.less'


const A = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'yellow', position: 'absolute', top: 0, left: 0 }}>

        </div>
    )
}

const B = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'red', position: 'absolute', top: 0, left: 0 }}>

        </div>
    )
}

const C = props => {
    return (
        <div style={{ height: 300, width: 400, background: 'green', position: 'absolute', top: 0, left: 0 }}>

        </div>
    )
}

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

    render() {

        const { pathname } = this.props.router.location

        return (
            <div>
                <div className={styles.container}>
                    <TransitionGroup>
                        <CSSTransition key={pathname} timeout={500} classNames="fade" mountOnEnter={true} unmountOnExit={true}>
                            <Switch location={this.props.router.location}>
                                <Route exact path="/" component={A} />
                                <Route exact path="/a" component={A} />
                                <Route exact path="/b" component={B} />
                                <Route exact path="/c" component={C} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <button onClick={() => this.props.linkToA()}>A</button>
                <button onClick={() => this.props.linkToB()}>B</button>
                <button onClick={() => this.props.linkToC()}>C</button>
            </div>
        )
    }
}

export default App