import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueCookie  from 'vue-cookie'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: '导航栏',
      meta: {
            requireAuth: true,
        },
      component: () => import('@/components/Layout'),
      children:[
        {
          path: '/index.html',
          name: '默认页',
          component: () => import('@/views/Home')
        },
        {
          path: '/home',
          name: 'test',
          component: () => import('@/views/Home')
        },
        {
          path: '/about',
          name: '短信编辑',
          component: () => import('@/components/About')
        },
        {
          path: '/levels',
          name: '信息调度',
          component: () => import('@/components/Levels')
        },
        {
          path: '/resourceManagement',
          name: '资源管理',
          component: () => import('@/components/resourceManagement')
        },
        {
          path: '/BMap',
          name: '地图模式',
          component: () => import('@/components/BMap')
        },
        {
          path: '/record',
          name:'播放记录',
          component: () => import('@/components/Record')
        },
        {
          path: '/report',
          name:'报表统计',
          component: () => import('@/components/Report')
        },
        {
          path: '/account',
          name:'账号管理',
          component: () => import('@/components/Account')
        },
        {
          path: '/role',
          name:'角色管理',
          component: () => import('@/components/Role')
        },
        {
          path: '/sensitive',
          name:'敏感词管理',
          component: () => import('@/components/Sensitive')
        },
        {
          path: '/personalSet',
          name:'个人设置',
          component: () => import('@/components/personalSet')
        },
        {
          path: '/whiteList',
          name:'白名单管理',
          component: () => import('@/components/whiteList')
        },
        {
          path: '/Smessage',
          name:'短信网关配置',
          component: () => import('@/components/Smessage')
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:'登录',
      },
      component: () => import('@/views/Login')
    },

  ],

})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (VueCookie.get('test')) {
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})
export default router;