<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-table
          :data="ArticleList"
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="标题"
          >
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
            >
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数"
            >
          </el-table-column>
          <el-table-column
            label="状态"
           >
            <template slot-scope="scope">
              {{scope.row.comment_status ? '正常' : '关闭'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
           >
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.statusDisabled"
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="onStatusChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageConut"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {commentArticle,updataArticleStatus} from "../../api/article";

  export default {
    name: "CommentIndex",
    data(){
      return{
        ArticleList:[],
        onSwitch:false,
        pageConut:0,
        pageSize:20,
        page:1
      }
    },
    methods: {
      getArticle(page=1){
        this.page=page
        commentArticle({
          page,
          per_page:this.pageSize,
          response_type:'comment'
        })
        .then((value) => {
          const {results} =value.data.data
          results.forEach((article) => {
            article.statusDisabled=false
          })
          this.ArticleList=value.data.data.results
          this.pageConut=value.data.data.total_count

          // console.log(value)
        })
      },
      handleSizeChange(val) {
        this.getArticle(1)
      },
      handleCurrentChange(page) {
        this.getArticle(page)
        // console.log(page)
      },
      onStatusChange(article){
        article.statusDisabled=true
        updataArticleStatus(article.id.toString(),article.comment_status)
        .then((value) => {
          article.statusDisabled=false
          if (article.comment_status){
            this.$message({
              message:'打开成功',
              type:'success'
            })
          }else {

            this.$message({
              message:'关闭成功',
              type:'success'
            })
          }
        })
        // console.log(article)
      }
    },
    created() {
      this.getArticle()
    }
  }
</script>

<style scoped>

</style>
