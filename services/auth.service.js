import request from './base.service'

export const loginService = (data) => {
  return request
    .post('/auth/login', data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const registerService = (data) => {
  return request
    .post('/auth/register', data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const fetchMe = () => {
  return request
    .get('/auth/me')
    .then(res => [null, res.data])
    .catch(err => [err])
}