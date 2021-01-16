<template>
  <div class="article-container">
    <el-card class="header">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-form ref="form" :model="form" label-width="50px" size="mini">
          <el-form-item label="状态:">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道:">
            <el-select v-model="ChannelId" placeholder="请选择">
              <el-option
                label="全部"
                :value="null"
              ></el-option>
              <el-option
                v-for="(item,index) in channels"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="loading"
            >筛选</el-button>
          </el-form-item>
        </el-form>
    </el-card>
<!--    列表-->
    <el-card>
      <div slot="header" class="clearfix">
        <span>筛选的数据有{{TotalCount}}条</span>
      </div>
        <el-table
          v-loading="loading"
          class="list"
          size="small"
          :data="article"
          style="width: 100%">
          <el-table-column
            prop=""
            label="封面"
            >
            <template slot-scope="scope" >
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="cover">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            >
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleState[scope.row.status].type">
                {{articleState[scope.row.status].text}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" circle icon="el-icon-edit"></el-button>
              <el-button
                type="danger"
                circle icon="el-icon-delete"
                @click="onDeleteAricle(scope.row.id)"
                >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="OncurrentChange"
          background
          layout="prev, pager, next"
          :total="TotalCount"
          :page-size="PageSize"
          :disabled="loading"
        >
        </el-pagination>
    </el-card>

  </div>
</template>

<script>
  import {deleteArticle} from "../../api/article";
  import request from "../../utils/request";
  export default {
    name: "ArticleIndex",
    data() {
      return {
        form: {
          region: ''
        },
        article:[],
        articleState:[
          {text:'草稿',type:''},
          {text:'待审核',type:'info'},
          {text:'审核通过',type:'success'},
          {text:'审核失败',type:'warning'},
          {text:'已删除',type:'danger'},
        ],
        TotalCount:0,
        PageSize:10,
        status:null,
        channels:[],
        ChannelId:null,
        rangeDate:null,
        loading:true
      }
    },
    methods: {
      onDeleteAricle(articleID){
        deleteArticle(articleID.toString())
        .then((value) => {
          console.log(value)
        })
        console.log(11)
      },
      onSubmit() {
        this.loadList()
      },
      loadList(page=1){
        this.loading=true
        request({
          method:'GET',
          url:'/mp/v1_0/articles',
          headers:{
            Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIxNDk5NzgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.0d0RW8DArGI31mJoRWDuE784H0asMDU4fExfv8hLZ50'
          },
          params:{
            page,
            per_page:this.PageSize,
            status: this.status,
            channel_id:this.ChannelId,
            begin_pubdate:this.rangeDate ? this.rangeDate[0] : null,
            end_pubdate:this.rangeDate ? this.rangeDate[1] : null
          }
        })
        .then((value) => {
          this.loading=false
          this.article=value.data.data.results
          this.TotalCount=value.data.data.total_count
        })
      },
      OncurrentChange(page){
        this.loadList(page)
        console.log(page)

      },
      Channels(){
        request({
          method:'GET',
          url:'/mp/v1_0/channels',
          /*headers:{
            Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIxNDk5NzgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.0d0RW8DArGI31mJoRWDuE784H0asMDU4fExfv8hLZ50'
          },*/

        })
          .then((value) => {
            this.channels=value.data.data.channels
            console.log(value)
          })
      }
    },
    created() {
      this.loadList()
      this.Channels()
    }

  }
</script>

<style scoped>
.header{
  margin-bottom: 30px;
}
.list{
  margin-bottom: 20px;
}
.img-cover{
  width: 100px;

}
</style>
