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