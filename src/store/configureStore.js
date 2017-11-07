import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createBrowserHistory'

import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

export const history = createHistory({
    basename: '/',
})
const historyMiddleware = routerMiddleware(history)
const epicMiddleware = createEpicMiddleware(rootEpic)

export const configureStore = () => {
    const middlewares = [historyMiddleware, epicMiddleware]

    const enhancers = [applyMiddleware(...middlewares)]

    const composeEnhancers =
        __DEV__ && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose

    const store = createStore(rootReducer, composeEnhancers(...enhancers))

    if (module.hot) {
        module.hot.accept('./rootReducer.js', () => {
            const nextRootReducer = require('./rootReducer').default
            store.replaceReducer(nextRootReducer)
        })
        module.hot.accept('./rootEpic.js', () => {
            const nextEpic = require('./rootEpic').default
            epicMiddleware.replaceEpic(nextEpic)
        })
    }

    return store
}
