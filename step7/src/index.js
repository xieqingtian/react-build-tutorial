import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import App from './routes'
import './styles/index.css'
import { configureStore, history } from './store'

const store = configureStore()

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./routes/index.js', () => {
        const NextApp = require('./routes').default
        render(NextApp)
    })
}
