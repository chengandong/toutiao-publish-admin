<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="10">
        <el-col :sm="12" :md="15" :lg="12">
          <!-- 表单区域 -->
          <el-form ref="form" :model="userInfo" label-width="80px">
              <el-form-item label="编号">
                {{userInfo.id}}
              </el-form-item>
              <el-form-item label="手机">
                {{userInfo.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存设置</el-button>
              </el-form-item>
          </el-form>
        </el-col>
        <el-col :sm="12" :md="15" :lg="6" :offset="5">
          <el-avatar
          shape="square"
          :size="200"
          fit="cover"
          :src="userInfo.photo">
          </el-avatar>
          <p>修改头像</p>
        </el-col>
      </el-row>
      </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'SettingsIndex',
  data () {
    return {
      userInfo: {
        id: null,
        name: '', // 用户名
        email: '',
        mobile: '', // 手机号
        photo: '', // 用户头像
        intro: '' // 头条号简介
      }
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 获取用户个人资料
    loadUserInfo () {
      getUserProfile().then(res => {
        // console.log(res)
        this.userInfo = res.data.data
      })
    }
  }
}
</script>

<style>

</style>
