// 评论 相关请求 模块

import request from '@/utils/request'

// 获取 评论列表
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
