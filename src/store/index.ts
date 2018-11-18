import Vue from 'vue'
import Vuex from 'vuex'
import countries from './countries'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    countries,
    settings
  }
})
