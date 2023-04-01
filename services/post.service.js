import request from './base.service'

export const fetchPosts = () => {
  return request
    .get('/posts')
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const fetchPost = (slug) => {
  return request
    .get(`/posts/${slug}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const createPost = (data) => {
  return request
    .post('/posts', data)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const removePost = (slug) => {
  return request
    .delete(`/posts/${slug}`)
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const updatePost = (slug, data) => {
  return request
    .put(`/posts/${slug}`, data)
    .then(res => [null, res.data])
    .catch(err => [err])
}