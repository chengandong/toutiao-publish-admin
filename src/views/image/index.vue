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
        <el-radio-group v-model="radio1" size="small">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small">添加素材</el-button>
      </div>
      <!-- 素材列表-(响应式布局) -->
      <el-row :gutter="10">
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          >
          </el-image>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          >
          </el-image>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          >
          </el-image>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          >
          </el-image>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          >
          </el-image>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" :xs="12">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
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
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: '全部'
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
