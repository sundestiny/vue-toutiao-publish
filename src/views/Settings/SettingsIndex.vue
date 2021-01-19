<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号:">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机:">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo">
          </el-avatar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {getProfile} from "../../api/user";

  export default {
    name: "SettingsIndex",
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        user:{}
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      loadProfile () {
        getProfile()
        .then((value) => {
          this.user=value.data.data
          console.log(value)
        })
      }
    },
    created() {
      this.loadProfile()
    }
  }
</script>

<style scoped>

</style>
