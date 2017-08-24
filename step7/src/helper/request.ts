import axios from 'axios'
import qs from 'qs'
import { API_PATH } from '../constants'

const instance = axios.create()

instance.defaults.timeout = 20000 // 设置超时时间
instance.defaults.baseURL = API_PATH
instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(
    config => {
        if (config.method === 'post' && config.data) {
            config.data = qs.stringify(config.data)
        }
        // config.withCredentials = true  // 需要跨域打开此配置
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

// 响应拦截
instance.interceptors.response.use(
    response => {
        // status为200-300
        const { code, message, data } = response.data
        return code === 0 ? data : Promise.reject({ code, message })
    },
    error => {
        return Promise.reject(error)
    },
)

export default instance
