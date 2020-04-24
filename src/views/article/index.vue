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
          <el-radio label="null">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
          <el-radio label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadArticles(1)">筛选</el-button>
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
        >
        <el-table-column
          prop="date"
          label="封面"
        >
        <!-- 自定义模板 可以遍历数据 -->
        <template slot-scope="scope">
          <img
          v-if="scope.row.cover.images[0]"
          :src="scope.row.cover.images[0]"
          class="article-cover"
          >
          <img v-else class="article-cover" src="./no-photo.gif" alt="">
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
              @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        @current-change="oncurrentPage"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
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
      pageSize: 20, // 每页显示条目个数
      status: null // 筛选文章的状态,默认为全部
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    loadArticles (page = 1) {
      getArticleList({
        page,
        per_page: this.pageSize,
        status: this.status // 文章状态
      }).then((res) => {
        console.log(res)
        // this.articlesData = res.data.data.results
        // this.totalCount = res.data.data.total_count
        // 解构赋值-对象(ES6语法)
        const { results, total_count: totalCount } = res.data.data
        this.articlesData = results
        this.totalCount = totalCount
      }).catch((err) => {
        console.log(err)
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
