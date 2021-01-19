<template>
  <div class="publsih-container">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="form" :model="article" label-width="80px" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title" ></el-input>
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <el-input type="textarea" v-model="article.content" ></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择">
              <el-option
                :label="channels.name"
                :value="channels.id"
                v-for="(channels,index) in channels"
                :key="index"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(false)">发表</el-button>
            <el-button  @click="onSubmit(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import
  {
    addArticle,
    getArticle,
    updataArticle
  } from "../../api/article";
  import request from "../../utils/request";

  export default {
    name: "PublishIndex",
    data() {
      return {
        article:{
          title:'',
          content:'',
          cover:{
            type:0,
            images:[]
          },
          channel_id:null,
        },
        channels:[],
        rules:{
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入文章内容', trigger: 'blur' }
          ],
          channel_id: [
            { required: true, message: '请选择频道', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit (draft=false) {
        this.$refs['form'].validate((valid) => {
          if (!valid){
            return false
          }else {
            if(this.$route.query.id){
              updataArticle(this.$route.query.id,this.article,draft)
                .then((value) => {
                  this.$message({
                    message:'修改成功',
                    type:'success'
                  })
                  this.$router.push('/article')
                })
            }else {
              addArticle(this.article,draft)
                .then((value) => {
                  // console.log(value)
                  this.$message({
                    message:'发布成功',
                    type:'success'
                  })
                  this.$router.push('/article')
                })
            }
          }
        })


      },
      getChannels(){
        request({
          method:'GET',
          url:'/mp/v1_0/channels',
        })
        .then((value) => {
          this.channels=value.data.data.channels
          // console.log(value)
        })
      },
      editArtcile(){
        getArticle(this.$route.query.id)
        .then((value) => {
          console.log(value)
          this.article=value.data.data

        })
        console.log(2);
      }
    },
    created() {
      this.getChannels()
      if (this.$route.query.id){
        this.editArtcile()
      }

    }
  }
</script>

<style scoped>

</style>
