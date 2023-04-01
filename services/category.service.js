import request from './base.service'

export const fetchCategories = () => {
  return request
    .get('/categories')
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const fetchCategory = (id) => {
  return request
    .get(`/categories/${id}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const createCategory = (data) => {
  return request
    .post('/categories', data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const updateCategory = (id, data) => {
  return request
    .put(`/categories/${id}`, data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const removeCategory = (id) => {
  return request
    .delete(`/categories/${id}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}