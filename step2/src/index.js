import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import App from './App'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./App.js', () => {
        const NextApp = require('./App').default
        render(NextApp)
    })
}
