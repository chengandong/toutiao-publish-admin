<template>
  <div class="comment-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      stripe
      :data="comments"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? '正常' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentIndex',
  data () {
    return {
      comments: [] // 评论数据 列表
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 获取 评论管理 数据信息
    loadComments () {
      getComments({
        response_type: 'comment'
      }).then((res) => {
        console.log(res)
        this.comments = res.data.data.results
      })
    }
  }
}
</script>

<style>

</style>
