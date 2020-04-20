import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.less'

// 注册 Element 组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建 Vue 根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
