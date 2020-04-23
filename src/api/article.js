// 文章 相关请求 模块

import request from '@/utils/request'

// 获取 文章列表
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
