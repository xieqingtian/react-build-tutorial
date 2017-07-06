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