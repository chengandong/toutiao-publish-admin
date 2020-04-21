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
            v-model="user.name"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
          <!-- 验证码 -->
        <el-form-item>
          <el-input
          v-model="user.name"
          placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
          <!-- 同意条款 -->
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
          <!-- 登录 -->
        <el-form-item>
          <el-button
          type="primary"
          class="login-btn"
          @click="onSubmit"
        >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
