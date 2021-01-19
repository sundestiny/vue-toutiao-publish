import request from "../utils/request";
//获取用户素材
export const getImage= (params) => {
  return request({
    method:'GET',
    url:`/mp/v1_0/user/images`,
    headers:{
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIzMTE1MTksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.PEbposlDWOkv5ozWwlI3ZI8yaYw_I3CiCQIjnZV2cG4'
    },
    params
  })
}
