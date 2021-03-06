<template>
  <div class="article-container">
    <!-- 筛选 卡片 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单数据 筛选  -->
      <el-form ref="form" :model="form" label-width="40px" size="small">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
          <el-radio label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择频道">
          <el-option :value="null" label="全部"></el-option>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="rangeDate"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
         :disabled="loading"
         @click="loadArticles(1)"
         >筛选</el-button>
      </el-form-item>
      </el-form>
    </el-card>

    <!-- 列表数据 呈现卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">根据筛选条件共查询到 {{totalCount}} 条结果:</div>
      <!-- 表格 数据列表 -->
      <el-table
        :data="articlesData"
        style="width: 100%"
        class="list-table"
        v-loading="loading"
        >
        <el-table-column
          prop="date"
          label="封面"
        >
        <!-- 自定义模板 可以遍历数据 -->
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover"
            lazy
            >
            <div
            slot="placeholder"
            class="image-slot"
            >
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <!-- <img
          v-if="scope.row.cover.images[0]"
          :src="scope.row.cover.images[0]"
          class="article-cover"
          >
          <img v-else class="article-cover" src="./no-photo.gif" alt=""> -->
        </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 自定义模板 -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 自定义列模板 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
              ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="oncurrentPage"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleList,
  getArticleChannels,
  deleteArticle
} from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articlesData: [], // 文章数据列表
      articleStatus: [ // 文章数据列表 状态
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0, // 文章总数据条数
      pageSize: 10, // 每页显示条目个数
      status: null, // 筛选文章的状态,默认为全部
      channels: [], // 文章频道信息数据
      channelId: null, // 筛选频道标识
      rangeDate: null, // 筛选日期的范围
      loading: true, // loading 遮罩
      page: 1 // 当前页数
    }
  },
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      // 开启 loading 遮罩
      this.loading = true
      getArticleList({
        page,
        per_page: this.pageSize,
        status: this.status, // 文章状态
        channel_id: this.channelId, // 文章频道
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 起始时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止时间
      }).then((res) => {
        // console.log(res)
        // this.articlesData = res.data.data.results
        // this.totalCount = res.data.data.total_count
        // 解构赋值-对象(ES6语法)
        const { results, total_count: totalCount } = res.data.data
        this.articlesData = results
        this.totalCount = totalCount
        // 请求结束 关闭 loading 遮罩
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取文章频道
    loadChannels () {
      getArticleChannels().then((res) => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除文章信息
    onDeleteArticle (articleId) {
      // 测试 代码
      // console.log(articleId)
      // console.log(articleId.toString())
      this.$confirm('亲,您确认要删除本条信息吗?', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定要执行的 代码
        deleteArticle(articleId.toString()).then((res) => {
          // 测试代码
          // console.log(res)
          // 删除成功,更新 文章表格数据列表
          this.loadArticles(this.page)
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    oncurrentPage (page) {
      // console.log(page)
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
  .article-cover {
    width: 120px;
    background-size: contain;
  }
}
</style>
