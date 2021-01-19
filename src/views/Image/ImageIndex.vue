<template>
  <div class="img-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" class="btn" @change="onCollect" size="mini">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          class="btn"
          @click="dialogVisible=true"
        >上传素材</el-button>
      </div>
      <el-row :gutter="20">
        <el-col
          :xs="12" :sm="6" :md="4" :lg="3"
          v-for="(image,index) in imageList"
          :key="index"
        >
          <el-image
            class="img"
            style=" height: 100px"
            :src='image.url'
            fit="cover">
          </el-image>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        :headers="upImage"
        name="image"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import {getImage} from "../../api/images";

  export default {
    name: "ImageIndex",
    data(){
      const user=JSON.parse(window.localStorage.getItem('user'))
      return{
        collect: false,
        imageList:[],
        dialogVisible:false,
        upImage:{
          Authorization:`Bearer ${user.token}`
        }
      }
    },
    created() {
      this.loadImage(false)
    },
    methods:{
      loadImage(collect=false){
        getImage({
          collect
        })
        .then((value) => {
          this.imageList=value.data.data.results
          // console.log(value)
        })
      },
      onCollect(value){
        this.loadImage(value)
        console.log(value)
      }
    }
  }
</script>

<style scoped>
  .img{
    padding-bottom: 20px;
  }
  .btn{
    margin-bottom: 20px;
  }
  .action-head{
    display: flex;
    justify-content: space-between;
  }
</style>
