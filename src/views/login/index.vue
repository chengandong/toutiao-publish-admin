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
        ref="form"
        :model="user">
          <!-- 手机号 -->
        <el-form-item>
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
          <!-- 验证码 -->
        <el-form-item>
          <el-input
          v-model="user.code"
          placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
          <!-- 同意条款 -->
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
          <!-- 登录按钮 -->
        <el-form-item>
          <el-button
          type="primary"
          class="login-btn"
          @click="onLogin"
        >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      checked: false
    }
  },
  methods: {
    onLogin () {
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: this.user
      }).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '恭喜你,登录成功',
          type: 'success'
        })
      }).catch(err => {
        // 登录失败
        console.log('登录失败' + err)
        // 弹出 提示
        this.$message.error('很遗憾,登录失败')
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
            .login-btn {
                width: 100%;
            }
        }
    }
}
</style>
