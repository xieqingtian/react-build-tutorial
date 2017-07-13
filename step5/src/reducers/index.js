import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import count from './counter'

const rootReducer = combineReducers({ count, router: routerReducer })

export default rootReducer