# 在项目中使用redux
接下来我们需要在项目中引入redux相关库，在这一步中，我将尽量规范化项目的目录结构，如下。
```js
│  .babelrc                       //babel配置文件
│  package-lock.json
│  package.json
│  README.md
│
├─server                          //存放服务端代码文件
│  │  server.js                   //开启http服务
│  │
│  └─middleware
│          devMiddleware.js       
│          hotMiddleware.js
│
├─src                             //存放前端业务代码文件
│  │  index.js                    //前端页面入口文件
│  │
│  ├─actions                     //存放action文件
│  │      counter.js
│  │
│  │
│  ├─assets                      //前端静态资源目录
│  │      index.html
│  │
│  ├─components                  //存放你的react组件
│  │      App.js
│  │      app.less
│  │
│  ├─constants                   //存放actionType以及其他常量
│  │      index.js
│  │
│  ├─containers                  //存放容器组件
│  ├─helper                      //存放一些自己的工具函数
│  │
│  │
│  ├─reducers                    //存放reducer文件
│  │      counter.js
│  │      index.js
│  │
│  └─store                      //store配置文件
│          configureStore.js
│
└─webpack                        //存放webpack配置文件
        webpack.config.js
```
在这一步我集成redux及其相关库完成了一个简单的计数器功能，具备增加计数，减少计数，异步增加计数功能，下面我们开始基于上一步做出修改。

首先我们安装redux以及react的chrome调试工具（ 安装需要科学上网 ）。  
### [react调试工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-CN)
### [redux调试工具](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-CN)

然后需要安装redux相关库，执行以下命令  
```js
npm i --save react-redux redux redux-thunk
```
接下来我们根据上述目录结构新建好文件后，开始修改文件。  
修改入口文件src/index.js如下  
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import {Provider} from 'react-redux'
import App from './components/App'
import configureStore from './store/configureStore'

const store = configureStore()

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./components/App.js', () => {
        const NextApp = require('./components/App.js').default
        render(NextApp)
    })
}
```
修改components/App.js如下
```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/counter'
import styles from './app.less'

const mapStateToProps = (state, ownProps) => {
    return state.count
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
    render() {
        return (
            <div>
                <h1 className={styles.title}>{this.props.count}</h1>
                <button onClick={this.props.actions.increase}>增加</button>
                <button onClick={this.props.actions.decrease}>减少</button>
                <button onClick={this.props.actions.asyncIncrease}>异步增加</button>
            </div>
        )
    }
}

export default App
```
修改actions/counter.js如下
```js
import { INCREASE, DECREASE } from '../constants/index'

//增加计数
export const decrease = () => ({
    type: DECREASE,
    payload: {}
})

//减少计数
export const increase = () => ({
    type: INCREASE,
    payload: {}
})

//异步增加计数
export const asyncIncrease = () => async (dispatch, getState) => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 2000)
        })
        dispatch(increase())
    } catch (error) {
        console.log(error)
    }
}
```
修改constants/index.js如下
```js
export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
```
修改reducers/counter.js如下
```js
import { INCREASE, DECREASE } from '../constants/index'

const counterInitialState = {
    count: 0
}

const counter = (state = counterInitialState, action) => {
    switch (action.type) {
        case INCREASE:
            return { ...state, count: state.count + 1 }
        case DECREASE:
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}

export default counter
```
修改reducers/index.js如下
```js
import { combineReducers } from 'redux'
import count from './counter'

const rootReducer = combineReducers({ count })

export default rootReducer
```
修改store/configureStore.js如下
```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const configureStore = () => {
    
    const middlewares = [thunkMiddleware]

    const enhancers = [applyMiddleware(...middlewares)]

    //加入redux调试工具
    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

    const store = createStore(rootReducer, composeEnhancers(...enhancers))

    if (module.hot) {
        // reducers热加载
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore
```
至此，我们在项目中引入了redux管理状态，并且试用了redux-thunk处理异步action，还加入了redux以及react的chrome调试扩展，现在重新启动项目看看吧。