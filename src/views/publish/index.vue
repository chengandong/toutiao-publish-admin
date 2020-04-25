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
    <el-form ref="form" :model="article" label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="article.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="article.channel_id" placeholder="请选择活动区域">
        <el-option
        v-for="channel in channels"
        :key="channel.id"
        :label="channel.name"
        :value="channel.id"
        ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish(false)">发表</el-button>
        <el-button @click="onPublish(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
</el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  publishArticle
} from '@/api/article'
export default {
  name: 'PublishIndex',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 0, // 封面类型
          images: []
        },
        channel_id: null // 文章所属频道id
      },
      channels: [] // 文章频道信息
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取 文章频道信息
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 发表 文章
    onPublish (draft) {
      publishArticle(this.article, draft).then(res => {
        // console.log(res)
        // Message 消息提示
        this.$message({
          message: `恭喜你,${draft ? '存为草稿' : '发表'}文章信息成功`,
          type: 'success'
        })
        // 跳转到 内容管理 页面
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
