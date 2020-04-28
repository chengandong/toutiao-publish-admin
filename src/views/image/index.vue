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
        @change="loadImageList(1)">
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
        class="img_list"
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
          <div class="shadowOption">
            <i
            :class="{
              'el-icon-star-off': true,
              'icon': !img.is_collected,
              'icon_red': img.is_collected
              }"
            @click="oncolImage(img)"
            ></i>
            <i
            class="el-icon-delete icon"
            @click="deleteImage(img.id)"></i>
          </div>
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
// 导入 删除 图片素材
import {
  getImages,
  deleteImage,
  collectImage
} from '@/api/image'
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
    this.loadImageList(1, false)
  },
  methods: {
    // 获取 图片素材
    loadImageList (page = 1, isCollected = false) {
      // 重置页码,重第一页开始,(解决数据与页码不对应)
      this.page = page
      // 开启 loading 遮罩
      this.loading = true
      getImages({
        collect: this.isCollected, // 是否是收藏的图片
        page, // 页数
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
    },
    // 删除图片素材
    deleteImage (imgId) {
      // console.log(imgId)
      deleteImage(imgId).then(res => {
        // console.log(res)
        // 消息提示
        this.$message({
          message: '删除图片成功',
          type: 'success'
        })
        // 成功后 重新加载 素材图片
        this.loadImageList(false)
      })
    },
    // 收藏图片素材
    oncolImage (img) {
      // 收藏图片素材
      collectImage(img.id, !img.is_collected).then(res => {
        // console.log(res)
        // 更新 收藏状态
        img.is_collected = !img.is_collected
        // 消息提示
        this.$message({
          message: `${img.is_collected ? '添加' : '取消'}收藏成功`,
          type: 'success'
        })
      })
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
.img_list {
  position: relative;
  .shadowOption {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 160px;
    height: 30px;
    background: rgba(0,0,0,.4);
    position: absolute;
    left: 5px;
    bottom: 0;
    .icon {
      color: #fff;
    }
    .icon_red {
      color: red;
    }
  }
}
</style>
