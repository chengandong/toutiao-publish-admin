<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="image-head">
        <el-radio-group
        v-model="isCollected"
        size="small"
        :disabled="loading"
        @change="loadImageList">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
        type="success"
        size="small"
        @click="dialogUploadVisible = true"
        >添加素材</el-button>
      </div>
      <!-- 素材列表-(响应式布局) -->
      <el-row :gutter="10">
        <el-col
        v-for="img in images"
        v-loading="loading"
        :key="img.id"
        :lg="4"
        :md="6"
        :sm="6"
        :xs="12">
          <el-image
            style="width: 160px; height: 160px"
            :src="img.url"
            fit="cover"
          >
          </el-image>
        </el-col>
      </el-row>
      <!-- 素材列表 分页 -->
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        :disabled="loading"
        @current-change="oncurrentPage"
        >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
      width="30%"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        name="image"
        :show-file-list="true"
        :headers="uploadHeaders"
        :on-success="onUploadSuccess"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 导入 获取 图片素材
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  data () {
    // 获取 本地存储中 保存的用户信息数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    // console.log(user)
    return {
      images: [], // 图片素材
      isCollected: false, // 是否收藏
      totalCount: null, // 图片总数
      page: 1, // 当前页数
      pageSize: 12, // 每页数量
      loading: false, // loading 遮罩
      dialogUploadVisible: false, // Dialog 对话框 是否显示
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  created () {
    this.loadImageList(false, 1)
  },
  methods: {
    // 获取 图片素材
    loadImageList (isCollected = false, page = 1) {
      // 开启 loading 遮罩
      this.loading = true
      getImages({
        collect: this.isCollected, // 是否是收藏的图片
        page: this.page, // 页数
        per_page: this.pageSize // 每页数量
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
        // 请求结束 关闭 loading 遮罩
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    oncurrentPage (page) {
      // console.log(page)
      this.loadImageList(page)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 文件上传成功时的钩子
    onUploadSuccess () {
      // 关闭 对话框
      this.dialogUploadVisible = false
      // 更新 素材图片
      this.loadImageList(false)
    }
  }
}
</script>

<style scoped lang="less">
.image-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>
