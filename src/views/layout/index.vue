<template>
  <el-container class="layout-container">
      <el-aside
      class="aside"
      width="auto"
      >
        <!-- 侧边栏 -->
        <lay-aside
        class="aside-menu"
        :is-collapse="isCollapse"
        />
      </el-aside>
      <el-container>
        <el-header class="header">
            <div>
              <i :class="{
                'el-icon-s-fold': !isCollapse,
                'el-icon-s-unfold': isCollapse
              }"
              @click="isCollapse = !isCollapse"
              ></i>
              <span>内蒙古大学创业学院</span>
            </div>
            <!-- Dropdown 下拉菜单 -->
            <el-dropdown>
              <!-- 用户头像 和 用户名 -->
              <div class="avatar-wrap">
                <img class="avatar" :src="user.photo" alt="">
                <span>{{user.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-setting"></i>个人设置</el-dropdown-item>
                <!-- 将原生事件绑定到组件需要 native 修饰符 -->
                <el-dropdown-item
                  @click.native="onloginout"
                ><i class="el-icon-lock"></i>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-header>
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
// 导入 获取用户信息 模块
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'LayoutIndex',
  // 注册 子组件
  components: {
    LayAside
  },
  data () {
    return {
      user: {}, // 用户信息
      isCollapse: false
    }
  },
  created () {
    // 组件初始化,获取用户信息
    this.loadUserProfile()
    // 注册 通信的 那个事件 (接受数据)
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then((res) => {
        // 测试 代码
        // console.log(res)
        this.user = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    onloginout () {
      this.$confirm('亲,你确认要退出吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除 本地 保存的 用户信息数据
        window.localStorage.removeItem('user')
        // 跳转到 登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .avatar-wrap {
          display: flex;
          align-items: center;
          .avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
    }
}
</style>
