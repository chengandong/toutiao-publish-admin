<template>
  <div class="upload-cover" @click="showCoverOption">
    <div class="cover-wrap">
      <img
        src=""
        class="cover-img"
        ref="cover-img"
      >
    </div>

    <!-- Dialog 对话框 -->
    <el-dialog
      title="选择封面"
      :visible.sync="dialogCoverVisible"
      width="30%"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">素材库内容</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input
            type="file"
            ref="file"
          >
          <img
            ref="preview-img"
            src=""
          >
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCoverVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCoverVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  data () {
    return {
      dialogCoverVisible: false,
      activeName: 'first'
    }
  },
  methods: {
    showCoverOption () {
      this.dialogCoverVisible = true
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 150px;
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
