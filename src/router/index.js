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

// 路由 导航守卫
router.beforeEach((to, from, next) => {
  // 测试 代码
  // console.log(from)
  // console.log(to)

  // 获取 用户数据信息
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 判断 当前是否 是登录页面
  if (to.path !== '/login') {
    if (user) {
      // 已登录,允许通过
      next()
    } else {
      // 未登录,跳转到登录页
      next('/login')
    }
  } else {
    // 登录页面,允许通过
    next()
  }
})
export default router
