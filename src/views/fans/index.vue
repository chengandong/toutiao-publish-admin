<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="first">
          <el-row :gutter="10">
            <el-col
              :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
              v-for="item in fans"
              :key="item.id.toString()"
            >
              <div class="fans_item">
                <div class="demo-basic--circle">
                  <div class="block">
                    <el-avatar :size="80" :src="item.photo">
                    </el-avatar>
                  </div>
                </div>
                <p>{{item.name}}</p>
                <el-button
                  type="success"
                  plain
                  size="small"
                >+关注</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 分页 功能 -->
          <el-pagination
            layout="prev, pager, next"
            :total="totalCount"
            background
            :page-size="pageSize"
            :current-page.sync="page"
            :disabled="loading"
            @current-change="oncurrentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝图表" name="second">
          <div ref="main" style="width:600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入 echarts 包
import echarts from 'echarts'

import { getFansList } from '@/api/fans'
export default {
  name: 'FansIndex',
  data () {
    return {
      activeName: 'first',
      fans: [], // 粉丝数据
      totalCount: 0, // 粉丝总数据条数
      pageSize: 24, // 每页显示条目个数
      page: 1, // 当前页数
      loading: false // loading 遮罩
    }
  },
  created () {
    this.loadFansList()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '粉丝信息'
      },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [{
        name: '访问量',
        type: 'bar',
        data: [10, 50, 200, 158, 400, 666, 546]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {
    // 获取粉丝列表
    loadFansList (page = 1) {
      // 开启 loading 遮罩
      this.loading = true
      getFansList({
        page, // 页数
        per_page: this.pageSize // 每页数量
      }).then(res => {
        this.fans = res.data.data.results
        this.totalCount = res.data.data.total_count
        // 请求结束 关闭 loading 遮罩
        this.loading = false
      })
    },
    oncurrentPage (page) {
      this.loadFansList(page)
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
  margin-right: 30px;
  margin-bottom: 15px;
}
</style>
