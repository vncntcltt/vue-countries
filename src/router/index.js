import Vue from 'vue'
import Router from 'vue-router'

import Countries from '../views/Countries'
import Settings from '../views/Settings'
import About from '../views/About'

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
      component: Countries
    },
    {
      path: '/countries/:region',
      component: Countries
    },
    {
      path: '/countries/:region/:subregion',
      component: Countries
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/settings',
      component: Settings
    }
  ]
})
