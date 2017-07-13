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