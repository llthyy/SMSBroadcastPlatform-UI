import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: '导航栏',
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
          name: '信息编辑',
          component: () => import('@/views/About')
        },
        {
          path: '/levels',
          name: '信息调度',
          component: () => import('@/components/Levels')
        },
        {
          path: '/system',
          name: '资源管理',
          component: () => import('@/components/System')
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
          path: '/privilege',
          name:'权限管理',
          component: () => import('@/components/Privilege')
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
        }
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
  ]
})