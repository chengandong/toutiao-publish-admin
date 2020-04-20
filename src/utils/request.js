// axios 封装
import axios from 'axios'

// 创建一个axios实例 进行配置
const request = axios.create({
  // 基准地址 配置
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 导出 请求包
export default request
