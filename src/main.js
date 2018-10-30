import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import i18n from './plugins/i18n'
import store from './store/index'
import router from './router/index'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
