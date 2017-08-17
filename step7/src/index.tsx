import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
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