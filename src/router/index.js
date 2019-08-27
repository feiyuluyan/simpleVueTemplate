import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/view/front/Index'),
      meta: {
        name: '首页'
      },
      children: [{
        path: '',
        name: 'Home',
        meta: {
          name: '首页'
        },
        component: () => import('@/view/front/home/Home')
      }]
    }, {
      path: '/admin',
      name: 'AdminIndex',
      component: () => import('@/view/admin/Index'),
      children: [{
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('@/view/admin/column/Column')
      }, {
        path: 'fileCompare',
        name: 'fileCompare',
        component: () => import('@/view/admin/fileCompare/fileCompare.vue')
      }]
    }
  ]
})
// router.beforeEach((to, from, next) => {
// })
export default router
