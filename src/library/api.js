import request from '@/plugins/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}

export function member(data = {}) {
  return request({
    url: '/me',
    method: 'GET',
    data,
  })
}

export function courses(data = {}) {
  return request({
    url: '/courses?type=attendance',
    method: 'GET',
    data,
  })
}

export function postCart(data) {
  return request({
    url: '/carts',
    method: 'POST',
    data,
  })
}

export function deleteCart(data) {
  return request({
    url: '/carts',
    method: 'DELETE',
    data,
  })
}
