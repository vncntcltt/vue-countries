import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import en from 'vuetify/es5/locale/en'
import fr from 'vuetify/es5/locale/fr'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { en, fr },
    current: process.env.VUE_APP_I18N_LOCALE || 'en'
  }
})
