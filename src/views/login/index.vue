<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <!-- logo 部分 -->
      <div class="login-head">
        <div class="logo">
        </div>
      </div>
      <el-form
        class="login-form"
        ref="login-form"
        :rules="formRules"
        :model="user">
        <!-- 手机号 -->
        <i class="iconfont iconshoujihao"></i>
        <el-form-item prop="mobile">
          <el-input
            class="el-input--prefix"
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <i class="iconfont iconyanzhengma"></i>
        <el-form-item prop="code">
          <el-input
          class="el-input--prefix"
          v-model="user.code"
          placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
          <!-- 同意条款 -->
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
          <!-- 登录按钮 -->
        <el-form-item>
          <el-button
          type="primary"
          :loading="loginLoading"
          class="login-btn"
          @click="onLogin"
        >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      // checked: false,
      // 按钮加载 状态显示
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1[3,4,5,6,8,9]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义 验证规则
            validator: (rule, value, callback) => {
              // 测试代码
              // console.log(value)
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate((valid) => {
        // 测试代码
        // console.log(valid)
        // 如果 验证失败 不发请求
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      // 开启 loading
      this.loginLoading = true
      userLogin(this.user).then(res => {
        // console.log(res)

        // 登录成功
        this.$message({
          message: '恭喜你,登录成功',
          type: 'success'
        })

        // 关闭 loading
        this.loginLoading = false

        // 将接口 返回的 用户相关的 数据信息 保存到本地
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 登录成功 跳转到 首页
        this.$router.push('/')
      }).catch(err => {
        // 登录失败
        console.log('登录失败' + err)

        // 弹出 提示
        this.$message.error('很遗憾,登录失败,手机号或验证码错误')

        // 关闭 loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg');
    background-size: cover;
    .login-form-wrap {
        position: relative;
        min-width: 300px;
        padding: 30px 50px 10px;
        background-color: #fff;
        .login-head {
            display: flex;
            justify-content: center;
            .logo {
                width: 200px;
                height: 57px;
                padding-bottom: 10px;
                background: url('./logo_index.png') no-repeat;
                background-size: contain;
            }
        }
        .login-form {
           .iconshoujihao {
             position: absolute;
             left: 59px;
             top: 108px;
             z-index: 1;
           }
           .iconyanzhengma {
             position: absolute;
             left: 59px;
             top: 170px;
             z-index: 1;
           }
            .login-btn {
                width: 100%;
            }
        }
    }
}
</style>
