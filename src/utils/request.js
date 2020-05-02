// axios 封装
import axios from 'axios'
import jsonBigint from 'json-bigint'
import router from '@/router/'

// 单独引用
import { Message } from 'element-ui'
// 创建一个axios实例 进行配置
const request = axios.create({
  // 基准地址 配置
  baseURL: 'http://ttapi.research.itcast.cn/',

  // data 就是后端返回的原始数据(未经处理的 JSON 格式字符串)
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)
    try {
      // 转换 成功
      return jsonBigint.parse(data)
    } catch (err) {
      // 转换 失败
      console.log(err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 任何请求 都会经过这里
  function (config) {
    // 获取 用户携带的 数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 测试 代码
    // console.log(config)
    // 判断
    if (user) {
      // 设置 请求头
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  // 请求 失败 经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // console.dir(error)
  const { status } = error.response
  if (status === 401) {
    // 清除 本地 存储的用户信息
    window.localStorage.removeItem('user')
    // 跳转到 登录页面
    router.push('/login')
    // 消息 提示
    Message({
      type: error,
      message: '登录状态无效，请重新登录'
    })
  } else if (status === 403) {
    Message.warning('Token为携带或已经过期')
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('请求参数错误')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
})

// 导出 请求包
export default request
