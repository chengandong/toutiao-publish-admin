// 全局事件通信总线---(可以让任意组件之间通信,传输数据)

import Vue from 'vue'

export default new Vue()

/*
-------------------使用步骤---------------------
*/
// import globalBus from '@/utils/global-bus'
// 接受 数据的 组件 注册通信事件,接受数据
// globalBus.$on('foo', (data) => {
//   // 处理函数
// })

// import globalBus from '@/utils/global-bus'
// 发布数据的
// globalBus.$emit('bar',数据)
