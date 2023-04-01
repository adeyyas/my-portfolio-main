import request from './base.service'

export const fetchUploads = () => {
  return request
    .get('/uploads')
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const fetchUpload = (id) => {
  return request
    .get(`/uploads/${id}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const createUpload = (data) => {
  return request
    .post('/uploads', data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const removeUpload = (id) => {
  return request
    .delete(`/uploads/${id}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}
