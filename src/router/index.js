import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入 登录页面 组件
import Login from '@/views/login'

// 注册路由
Vue.use(VueRouter)

// 配置 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
