import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { loginReducer } from '../routes/Login/module'

const rootReducer = combineReducers({
    login: loginReducer,
    routing: routerReducer,
})

export default rootReducer
