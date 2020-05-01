<template>
  <div class="publish-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑 路劲导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- Form 表单区域 -->
    <el-form ref="publish-form" :model="article" :rules="formRules" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        <el-tiptap
          v-model="article.content"
          :height="300"
          placeholder="请输入文章内容"
          :extensions="extensions"
        />
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 文章封面子组件 路由出口 -->
        <template
          v-if="article.cover.type > 0"
        >
          <div class="article-cover">
            <upload-cover
              v-for="(cover, index) in article.cover.type"
              :key="cover"
              v-model="article.cover.images[index]"
            />
          <!-- <upload-cover
              v-for="(cover, index) in article.cover.type"
              :key="cover"
              :cover-image="article.cover.images[index]"
              @upload-imgurl="uploadImgurl(index, $event)"
          /> -->
          </div>
        </template>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择活动区域">
        <el-option
        v-for="channel in channels"
        :key="channel.id"
        :label="channel.name"
        :value="channel.id"
        ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish(false)">发表</el-button>
        <el-button @click="onPublish(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
</el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  publishArticle,
  getArticle,
  editArticle
} from '@/api/article'
// 引入 element-tiptap 包(富文本编辑器组件)
// 导入 封面这个 子组件
import UploadCover from './components/upload-cover'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor,
  Fullscreen,
  Preview,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  CodeBlock,
  FontType
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
// 引入 上传图片 模块
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 1, // 封面类型
          images: []
        },
        channel_id: null // 文章所属频道id
      },
      channels: [], // 文章频道信息
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new FontType(),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(), // 下划线
        new Image({
          // 自定义 上传图片
          uploadRequest (file) {
            // 接口 需要 FormData 类型的参数
            const fd = new FormData()
            fd.append('image', file)
            // 图片的上传方法，返回一个 Promise<url>
            // 上传 图片
            return uploadImage(fd).then(res => {
              // console.log(res)
              // 返回的 是 图片在 服务器端的 地址
              return res.data.data.url
            })
          }
        }),
        new Italic(),
        new TextColor(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new CodeBlock(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Preview(),
        new Fullscreen()
      ],
      // 表单验证
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          // 自定义 校验规则
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请再次输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  created () {
    this.loadChannels()
    // 判断 当前页面 路径上是否有参数id
    if (this.$route.query.id) {
      this.loadArticles()
    }
  },
  methods: {
    // 获取 文章频道信息
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft) {
      // 表单 提交之前进行 校验验证
      this.$refs['publish-form'].validate((valid) => {
        if (!valid) {
          return
        }
        const articleId = this.$route.query.id
        // 判断 发布文章 地址路径里是否有 id
        if (articleId) {
          // 编辑 文章信息
          editArticle(this.article, articleId, draft).then(res => {
            // console.log(res)
            // Message 消息提示
            this.$message({
              message: `恭喜你,${draft ? '编辑草稿' : '编辑发表'}文章信息成功`,
              type: 'success'
            })
            // 编辑成功 跳转到内容管理页面
            this.$router.push('/article')
          }).catch(err => {
            console.log(err)
          })
        } else {
          // 发表 文章信息
          publishArticle(this.article, draft).then(res => {
          // console.log(res)
          // Message 消息提示
            this.$message({
              message: `恭喜你,${draft ? '存为草稿' : '发表'}文章信息成功`,
              type: 'success'
            })
            // 跳转到 内容管理 页面
            this.$router.push('/article')
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 获取 指定文章信息
    loadArticles () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    }
    // uploadImgurl (index, url) {
    //   this.article.cover.images[index] = url
    // }
  }
}
</script>

<style scoped lang="less">
.article-cover {
  display: flex;
  justify-content: flex-start;
}
</style>
