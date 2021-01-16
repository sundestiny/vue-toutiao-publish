<template>
<div class="header">
  <div class="header-left">
    <i class="el-icon-s-fold"></i>
    <span>头条后台管理系统</span>
  </div>
  <el-dropdown>
  <span class="el-dropdown-link">
    <span>{{userName}}</span>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>设置</el-dropdown-item>
      <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>

</template>

<script>
  import request from "../../utils/request";
  export default {
    name: "Header",
    userName:'',
    created() {
      const user=window.localStorage.getItem('user')
      const userObj=JSON.parse(user)
      this.userName=userObj.name
    },
    methods:{
      exit(){
        this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
          window.localStorage.removeItem('user'),
            this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }
    }
  }
</script>

<style scoped>
.header{
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
</style>
