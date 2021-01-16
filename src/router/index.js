import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router=new Router({
  routes: [
    // {
    //   path:'',
    //   redirect:'/home'
    // },
    {
      path:'/login',
      component:()=>import('../views/Login/LoginIndex')
    },
    {
      path:'/',
      component:()=>import('../views/layout/LayoutIndex'),
      children:[
        {
          path:'/home',
          component:()=>import('../views/Home/HomeIndex')
        },
        {
          path:'/article',
          component:()=>import('../views/Article/ArticleIndex')
        },
        {
          path:'/image',
          component:()=>import('../views/Image/ImageIndex')
        },
        {
          path:'/publish',
          component:()=>import('../views/Publish/PublishIndex')
        },
        {
          path:'/comment',
          component:()=>import('../views/Comment/CommentIndex')
        },
        {
          path:'/fans',
          component:()=>import('../views/Fans/FansIndex')
        },
        {
          path:'/settings',
          component:()=>import('../views/Settings/SettingsIndex')
        },
      ]
    }


  ],
  mode:'history',
})
const user=JSON.parse(window.localStorage.getItem('user'))
router.beforeEach((to,from,next)=>{
  if(to.path !== '/login'){
    if (user){
      next();
    }else {
      next('/login')
    }
  }else{
   next()
  }
})
export default router
