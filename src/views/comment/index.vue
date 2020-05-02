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
      v-loading="loading"
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
        label="评论状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? '正常' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="操作"
        >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            :disabled="scope.row.statusDisabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onStatusChange(scope.row)"
            >
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
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size.sync="pageSize"
      :disabled="loading"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getComments,
  editCommentStatus
} from '@/api/comment'
export default {
  name: 'CommentIndex',
  data () {
    return {
      comments: [], // 评论数据 列表
      totalCount: 0, // 评论总数
      pageSize: 20, // 每页数量
      page: 1, // 页数
      loading: false
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    handleSizeChange () {
      this.loadComments(1)
    },
    handleCurrentChange (page) {
      // console.log(page)
      this.loadComments(page)
    },
    // 获取 评论管理 数据信息
    loadComments (page = 1) {
      // 开启 loding
      this.loading = true
      // 让页码 与 数据 一致
      this.page = page
      getComments({
        response_type: 'comment', // 传 comment 返回用于评论管理的字段
        page, // 页数
        per_page: this.pageSize // 每页数量
      }).then((res) => {
        // console.log(res)
        // 解构对象
        const { results, total_count: totalCount } = res.data.data
        // 遍历 每一项 添加 一个 属性表示(开光是否禁用)
        results.forEach(val => {
          val.statusDisabled = false
        })
        this.comments = results
        this.totalCount = totalCount
        // 关闭 loding
        this.loading = false
      })
    },
    // 修改文章评论状态
    onStatusChange (comment) {
      // 开启 禁用状态
      comment.statusDisabled = true
      editCommentStatus(comment.id.toString(), comment.comment_status).then(res => {
        // console.log(res)
        // 成功后 消息 提示
        this.$message({
          message: `${comment.comment_status ? '开启' : '关闭'}文章评论状态`,
          type: 'success'
        })
        // 关闭 禁用状态
        comment.statusDisabled = false
      })
    }
  }
}
</script>

<style>

</style>
