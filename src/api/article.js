import request from "../utils/request";
export const deleteArticle= (articleId) => {
  return request({
    method:'DELETE',
    url:`/mp/v1_0/articles/${articleId}`
  })
}
