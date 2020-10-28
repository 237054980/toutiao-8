import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


//路由表
const routes = [
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/Login')
  },
  {
    path:'/',
    component: () => import('@/views/Layout'),
    children:[
      {
        path:'',  //默认子路由
        name:'home',
        component: () => import('@/views/Home')
      },
      {
        path:'my',  
        name:'my',
        component: () => import('@/views/My')
      },
      {
        path:'qa',  
        name:'qa',
        component: () => import('@/views/Qa')
      },
      {
        path:'video',  
        name:'video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path:'/search',
    name:'search',
    component: () => import('@/components/Search')
  },
  {
    path:'/article/:articleId',
    name:'article',
    component: () => import('@/components/Article/ArticleContent'),
    //将动态路由参数映射到组件中的 props 中,无论是访问还是维护性都很方便
    props: true

  },
  {
    path:'/user/profile',
    name:'user-profile',
    component: () => import('@/components/UserName/UserProfile')
  },
  {
    path:'/user/chat',
    name:'user-chat',
    component: () => import('@/components/UserName/UserChat')
  },
]
  

const router = new VueRouter({
  routes
})

export default router
