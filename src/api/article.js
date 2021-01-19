import request from "../utils/request";
export const deleteArticle= (articleId) => {
  return request({
    method:'DELETE',
    url:`/mp/v1_0/articles/${articleId}`
  })
}
// 发布文章
export const addArticle= (data,draft=false) => {
  return request({
    method:'post',
    url:'/mp/v1_0/articles',
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    },
    params:{
      draft
    },
    data
  })
}
//获取文章
export const getArticle= (articleId) => {
  return request({
    method:'GET',
    url:`/mp/v1_0/articles/${articleId}`,
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    }
  })
}
//修改文章
export const updataArticle= (articleId,data,draft=false) => {
  return request({
    method:'PUT',
    url:`/mp/v1_0/articles/${articleId}`,
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    },
    params:{
      draft
    },
    data
  })
}

export const commentArticle= (params) => {
  return request({
    method:'GET',
    url:`/mp/v1_0/articles`,
    params,
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    }
  })
}

export const updataArticleStatus= (artricleId,allowComment) => {
  return request({
    method:'PUT',
    url:`/mp/v1_0/comments/status`,
    params:{
      article_id:artricleId
    },
    data:{
      allow_comment:allowComment
    },
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    }
  })
}
