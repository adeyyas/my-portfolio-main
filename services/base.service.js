import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8000',
})

axios.interceptors.request.use(config => {
  const token = typeof window != 'undefined' && localStorage?.token ? localStorage.token : null;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default axios