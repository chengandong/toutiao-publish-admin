// 用户请求 相关模块

// 用户登录
import request from '@/utils/request'
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取 用户信息
export const getUserProfile = () => {
  // 获取 用户携带的 数据
  const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 设置 请求头
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
