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

// 获取 文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除 文章信息
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 发表 文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft // 是否存为草稿（true 为草稿）
    }
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 编辑文章 (修改)
export const editArticle = (data, articleId, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    data,
    params: {
      draft
    }
  })
}
