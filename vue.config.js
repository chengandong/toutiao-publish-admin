module.exports = {
  // 自定义 VueCLI 中的 webpack 配置
  configureWebpack: {
    // 加载 script 标签里面的,而不是去node_modules里面打包
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'
    }
  }
}
