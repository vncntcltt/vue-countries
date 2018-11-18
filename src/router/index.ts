import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/countries'
    },
    {
      path: '/countries',
      component: () => import('@/views/Countries.vue')
    },
    {
      path: '/countries/:region',
      component: () => import('@/views/Countries.vue')
    },
    {
      path: '/countries/:region/:subregion',
      component: () => import('@/views/Countries.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
})
