import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入 登录页面 组件
import Login from '@/views/login'

// 导入 首页页面 组件
import Home from '@/views/home'
import Layout from '@/views/layout'
// 注册路由
Vue.use(VueRouter)

// 配置 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/', // path 为空，会默认由子路由渲染
    // name: 'layout', //如果有默认子路由，就不要给父路由起名字了
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
