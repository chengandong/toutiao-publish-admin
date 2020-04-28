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
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="编号">
                123
              </el-form-item>
              <el-form-item label="手机">
                456
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.name"></el-input>
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
          src="http://toutiao.meiduo.site/FrvifflobfNNRM9V_ZBTI2ZaTH4n">
          </el-avatar>
          <p>修改头像</p>
        </el-col>
      </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingsIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
