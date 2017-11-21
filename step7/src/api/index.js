import axios from 'axios'
import qs from 'qs'

const instance = axios.create()

instance.defaults.timeout = 10000
instance.defaults.baseURL = ''
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
    (config) => {
        if (config.method === 'post' && config.data) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => Promise.reject(error),
)

instance.interceptors.response.use(
    (response) => {
        const result = response.data
        if (result.success) {
            return result.data
        }
        const error = new Error()
        error.code = result.code
        error.message = result.message
        error.response = response
        return Promise.reject(error)
    },
    error => Promise.reject(error),
)

export default instance
