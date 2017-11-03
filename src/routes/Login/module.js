import { createAction, handleActions } from 'redux-actions'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

const initState = {
    username: '',
    isLogin: false,
}

export const login = createAction(LOGIN_REQUEST, { username: 'tom' })

export const loginReducer = handleActions(
    {
        LOGIN_SUCCESS: (state, payload) => ({
            username: payload.username,
            isLogin: true,
        }),
    },
    initState,
)
