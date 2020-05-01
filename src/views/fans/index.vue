<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <el-row :gutter="10">
            <el-col
              :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
            >
              <div class="fans_item">
                <div class="demo-basic--circle">
                  <div class="block">
                    <el-avatar :size="80" :src="circleUrl">
                    </el-avatar>
                  </div>
                </div>
                <p>123456</p>
                <el-button
                  type="success"
                  plain
                  size="small"
                >+关注</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="粉丝图表" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FansIndex',
  data () {
    return {
      activeName: 'first',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      sizeList: ['large', 'medium', 'small']
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="less">
.fans_item {
  width: 120px;
  height: 180px;
  border: 1px dashed #ccc;
  text-align: center;
  padding: 10px 0;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 15px;
}
</style>
