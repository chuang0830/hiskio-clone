// import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.hiskio.com/v2',
  withCredentials: false,
  timeout: 20000,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
