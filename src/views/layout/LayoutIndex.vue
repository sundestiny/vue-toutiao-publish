<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from "./Aside";
  import Header from "./Header";
  export default {
    name: "LayoutIndex",
    components:{
      Aside,
      Header
    }
  }
</script>

<style scoped>
  .container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .el-header {
    color: #333;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .aside {
    background-color: #D3DCE6;
    color: #333;

  }

  .main {
    background-color: #fff;
    color: #333;

  }
</style>
