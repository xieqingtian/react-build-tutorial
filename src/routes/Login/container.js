import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from './module'

const mapStateToProps = state => ({
    username: state.login.username,
})

const mapDispatchToProps = dispatch => ({
    login: username => dispatch(login(username)),
})

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    handleLogin = () => {
        this.props.login({ username: this.state.text })
    }

    render() {
        return (
            <div>
                <h1>{this.props.username}</h1>
                <input type="text" onChange={this.handleChange} />
                <button onClick={this.handleLogin}>提交按钮</button>
            </div>
        )
    }
}

export default Login
