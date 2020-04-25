<template>
  <div class="publish-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑 路劲导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- Form 表单区域 -->
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.resource">
        <el-radio label="单图"></el-radio>
        <el-radio label="三图"></el-radio>
        <el-radio label="无图"></el-radio>
        <el-radio label="自动"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表</el-button>
        <el-button>存为草稿</el-button>
      </el-form-item>
    </el-form>
</el-card>
  </div>
</template>

<script>
export default {
  name: 'PublishIndex',
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
