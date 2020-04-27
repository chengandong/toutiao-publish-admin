// 图片 请求 相关模块

import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取 图片素材
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 删除图片素材
export const deleteImage = (imgId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imgId}`
  })
}

// 收藏图片素材
export const collectImage = (imgId, data) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imgId}`,
    data
  })
}
