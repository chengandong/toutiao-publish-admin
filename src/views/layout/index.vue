<template>
  <el-container class="layout-container">
      <el-aside
      class="aside"
      width="200px"
      >
        <!-- 侧边栏 -->
        <lay-aside class="aside-menu" />
      </el-aside>
      <el-container>
        <el-header class="header">Header</el-header>
        <el-main class="main">
            <!-- 子路由 渲染 -->
            <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 导入 侧边栏 组件
import LayAside from './components/aside.vue'
export default {
  name: 'LayoutIndex',
  // 注册 子组件
  components: {
    LayAside
  }
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .aside {
        background-color: #002033;
        .aside-menu {
          height: 100%;
        }
    }
    .header {
        border-bottom: 1px solid #ccc;
    }
}
</style>
