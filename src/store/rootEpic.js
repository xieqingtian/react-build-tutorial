import { combineEpics } from 'redux-observable'
import * as loginEpics from '../routes/Login/epic'

const epicsList = Object.values({ ...loginEpics })

const rootEpic = combineEpics(...epicsList)

export default rootEpic
