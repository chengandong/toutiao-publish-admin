<template>
  <div class="image-list">
    <!-- 素材 图片 头部 -->
    <div class="image-head">
      <el-radio-group
        v-model="isCollected"
        size="small"
        :disabled="loading"
        @change="loadImageList(1)"
      >
      <el-radio-button label="false" @click.native="isShow = true">全部</el-radio-button>
      <el-radio-button label="true" @click.native="isShow = false">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        v-if="isShowAdd"
        type="success"
        size="small"
        @click="dialogUploadVisible = true"
      >添加素材</el-button>
    </div>
    <!-- 素材列表-(响应式布局) -->
    <el-row :gutter="10">
      <el-col
        class="img_list"
        v-for="(img, index) in images"
        v-loading="loading"
        :key="img.id"
        :lg="4"
        :md="6"
        :sm="6"
        :xs="12"
        @click.native="selected = index"
      >
        <el-image
          style="width: 160px; height: 160px"
          :src="img.url"
          fit="cover"
        >
        </el-image>
        <div
         v-show="isShowSelected && selected === index"
         class="selected"
        >
          <img src="./selected.png" alt="">
        </div>
        <div
          v-if="isShowOption"
          v-show="isShow"
          class="shadowOption"
        >
          <el-button
            size="medium"
            icon="el-icon-star-off"
            circle
            :loading="img.loading"
            :class="{
            'icon_btn': true,
            'icon': !img.is_collected,
            'icon_red': img.is_collected
          }"
          @click="oncolImage(img)"
          ></el-button>
          <el-button
            class="icon_btn icon"
            size="medium"
            icon="el-icon-delete"
            circle
            :loading="img.loading"
            @click="deleteImage(img)"
          ></el-button>
          <!-- <i
            :class="{
            'el-icon-star-off': true,
            'icon': !img.is_collected,
            'icon_red': img.is_collected
          }"
          @click="oncolImage(img)"
          ></i>
          <i
          class="el-icon-delete icon"
          @click="deleteImage(img.id)"></i> -->
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
    <!-- 对话框 -->
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
  name: 'ImageList',
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
      },
      isShow: true, // 阴影选择项是否显示
      selected: null // 选中 图片的 索引
    }
  },
  props: {
    // 是否 显示添加素材
    isShowAdd: {
      type: Boolean, // 布尔值
      default: true
    },
    // 是否 显示下拉 选项
    isShowOption: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
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
        // 解构对象
        const { results } = res.data.data
        // 遍历-为每一个对象添加一个 控制收藏按钮的 loading状态
        results.forEach((val) => {
          val.loading = false
        })
        this.images = results
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
      // 消息提示
      this.$message({
        message: '上传图片成功',
        type: 'success'
      })
      // 更新 素材图片
      this.loadImageList(1)
    },
    // 删除图片素材
    deleteImage (img) {
      // console.log(img.id)
      // 开启 加载状态
      img.loading = true
      deleteImage(img.id).then(res => {
        // console.log(res)
        // 消息提示
        this.$message({
          message: '删除图片成功',
          type: 'success'
        })
        // 成功后 重新加载 素材图片
        this.loadImageList(1)
        // 关闭 加载状态
        img.loading = false
      })
    },
    // 收藏图片素材
    oncolImage (img) {
      // 开启 加载状态
      img.loading = true
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
        // 关闭 加载状态
        img.loading = false
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
  .selected {
    background: rgba(0,0,0,.4);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
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
    .icon_btn {
      background: transparent;
      border: 1px solid transparent;
    }
    .icon {
      color: #fff;
    }
    .icon_red {
      color: red;
    }
  }
}
</style>
