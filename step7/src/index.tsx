var mobx = require('mobx').default
if (__DEV__) {
    var installDevTools = require('mobx-formatters').default
    installDevTools(mobx)
}

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import todoStore from './stores'

injectTapEventPlugin() // 支持onTouchTap事件

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={todoStore}>
                <MuiThemeProvider>
                    <Component />
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./components/App.tsx', () => {
        const NextApp = require('./components/App.tsx').default
        render(NextApp)
    })
}
