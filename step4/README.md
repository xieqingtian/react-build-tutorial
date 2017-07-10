# 在项目中使用[react-router4](https://reacttraining.com/react-router/)
在这一步中我们延续使用[step3](https://github.com/sundaypig/build-react-tutorial/tree/master/step3)的目录结构，并且将计数器的例子去除，新增加使用react-router的简单例子。  
我们需要用到的库如下  
[react-router](https://reacttraining.com/react-router/) react的路由实现  
[react-router-redux](https://github.com/reactjs/react-router-redux) 将history同步到redux的store中  
[react-transition-group](https://github.com/reactjs/react-transition-group) 用于实现路由切换时的过渡动画  
[history](https://github.com/ReactTraining/history) 配合react-router-redux使用的库  
我们先运行以下命令将这几个库安装一下  
```js
npm i --save react-router-dom history react-transition-group react-router-redux@next
```
这里说明一下，由于目前版本的react-router-redux库还没兼容到react-router4版本，所以我们要安装它的next版本。  
安装好这些依赖后我们就来改造step3的例子吧。    
首先我们将history同步到redux的store里去，修改一下store/configureStore.js如下  
```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'

export const history = createHistory()
const historyMiddleware = routerMiddleware(history)

const configureStore = () => {
    
    const middlewares = [historyMiddleware,thunkMiddleware]

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
然后我们再修改一下入口文件index.js如下  
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from './components/App'
import configureStore, { history } from './store/configureStore'

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
再修改一下reducers/index.js文件如下  
```js
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import count from './counter'

const rootReducer = combineReducers({ count, router: routerReducer })

export default rootReducer
```
如此我们就做好了将history同步到store中的配置，打开你的redux调试工具就会发现store里多出了一个名为router的状态。  
然后我们修改components/App.js如下  
```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import {Route, Switch} from 'react-router-dom' 
import { bindActionCreators } from 'redux'

const A = props => {
    return (
        <div style={{height: 300,width: 400, background: 'yellow'}}>
            
        </div>
    )
}

const B = props => {
    return (
        <div style={{height: 300,width: 400, background: 'red'}}>
            
        </div>
    )
}

const C = props => {
    return (
        <div style={{height: 300,width: 400, background: 'green'}}>
            
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    linkToA: ()=>dispatch(push('/a')),
    linkToB: ()=>dispatch(push('/b')),
    linkToC: ()=>dispatch(push('/c')),
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={A} />
                    <Route exact path="/a" component={A} />
                    <Route exact path="/b" component={B} />
                    <Route exact path="/c" component={C} />
                </Switch>
                <button onClick={()=>this.props.linkToA()}>A</button>
                <button onClick={()=>this.props.linkToB()}>B</button>
                <button onClick={()=>this.props.linkToC()}>C</button>
            </div>
        )
    }
}

export default App
```  
这样就完成了一个通过点击按钮改变页面路由达到切换显示A，B，C三个组件的例子。
如果你发现你的例子没有工作，那是因为我们忽略了最重要的一点，我们需要修改server/server.js内中的渲染页面逻辑，由于此时的页面地址是可变的，所以我们的服务端需要做到接收到任何页面地址请求都应该返回我们的index.html。  
现在修改一下server/server.js吧，需要修改的部分如下  
```js
//渲染页面
router.get('*', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../src/assets/index.html'), (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
    ctx.type = 'html'
    ctx.body = htmlFile
})
```
只是将 / 修改成 * 而已哦。  
接下来让我们给路由加上一点动画过渡的效果  
修改components/APP.js如下  
```js
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
                        <CSSTransition key={pathname} timeout={500} classNames="fade">
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
```
然后修改components/app.less文件如下  
```css
:global(.fade-enter) {
    transform: translateX(-400px);
}

:global(.fade-enter):global(.fade-enter-active) {
    transform: translateX(0px);
    transition: transform 500ms ease-in;
}

:global(.fade-exit) {
    transform: translateX(0px);
}

:global(.fade-exit):global(.fade-exit-active) {
    transform: translateX(400px);
    transition: transform 500ms ease-in;
}

.container {
    position: relative;
    height: 300px;
    width: 400px;
    overflow: hidden;
}
```
现在重新启动一下项目看看效果吧。