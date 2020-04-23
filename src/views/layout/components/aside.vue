<template>
  <el-menu
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <div class="asideLogo">
    </div>
    <el-menu-item index="/" class="lll">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-chat-dot-square"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-user-solid"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'LayAside',
  methods: {
  },
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: true
    }
  }
}
</script>

<style scoped lang="less">
.asideLogo {
  width: 100%;
  height: 60px;
  background: url('./logo_admin.png') no-repeat center;
}
.el-menu-item {
  width: 180px;
}
</style>
