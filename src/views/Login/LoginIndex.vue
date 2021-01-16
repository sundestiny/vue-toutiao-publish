<template>
  <div class="container">
    <el-form
      :model="user"
      class="login-form"
      :rules="rules"

    >
      <el-form-item >
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
          prop="mobile"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码" prop="code"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked">我已同意</el-checkbox>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          class="login-btn"
          :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import request from "../../utils/request"
  export default {
    name: "LoginIndex",
    data(){
      return{
        user: {
          mobile:'13911111111',
          code:'246810'
        },
        rules:{
          mobile:[
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ],
        },
        checked:false,
        loginLoading:false

      }
    },
    methods:{
      onSubmit() {
        const user=this.user
        this.loginLoading=true
        request({
          method:'POST',
          url:'/mp/v1_0/authorizations',
          data:user
        })
        .then((value) => {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.loginLoading=false
          window.localStorage.setItem('user',JSON.stringify(value.data.data))
          this.$router.push('/home')
        })
        .catch((reason) => {
          this.$message({
            message: '登录失败,手机号或验证码错误',
            type: 'error'
          });
          this.loginLoading=false
        })
      }
    }
  }
</script>

<style scoped>
.container{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: url("./img/login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  background-color: #fff;
  padding: 50px;
  min-width: 300px;
}
.login-btn{
  margin-top: 20px;
  width: 100%;
}
</style>
