<template>
  <div class="upload-cover" @click="showCoverOption">
    <div class="cover-wrap">
      <img
        class="cover-img"
        ref="cover-img"
        :src="value"
      >
    </div>

    <!-- Dialog 对话框 -->
    <el-dialog
      title="选择封面"
      width="68%"
      :visible.sync="dialogCoverVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list
            :is-show-add="false"
            :is-show-option="false"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input
            type="file"
            ref="file"
            @change="onFileChange"
          >
          <img
            width="200"
            ref="preview-img"
            src=""
          >
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCoverVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onUploadCover"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/components/image-list'
export default {
  name: 'UploadCover',
  data () {
    return {
      dialogCoverVisible: false,
      activeName: 'second'
    }
  },
  props: ['value'],
  components: {
    ImageList
  },
  methods: {
    showCoverOption () {
      this.dialogCoverVisible = true
    },
    onFileChange () {
      // 获取文件 对象
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      // 图片 预览
      this.$refs['preview-img'].src = blob
    },
    onUploadCover () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message({
            message: '请选择图片',
            type: 'warning'
          })
          return
        }
        // 接口 所需 参数
        const fd = new FormData()
        fd.append('image', file)
        // 上传封面图片素材
        uploadImage(fd).then(res => {
          // 关闭 对话框
          this.dialogCoverVisible = false
          // 展示 上传的 图片在 封面位置
          this.$refs['cover-img'].src = res.data.data.url
          // 将 图片地址 传给 父组件
          // this.$emit('upload-imgurl', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 180px;
  height: 170px;
  border: 1px dashed #ddd;
  margin-right: 20px;
  background: url(./pic_bg.png) center;
  background-size: cover;
  .cover-img {
    width: 100%;
    height: 100%;
  }
}
</style>
