<template>
  <div>
    <v-toolbar
      app
      clipped-left
    >
      <v-btn
        icon
        :title="$t('toolbar.label.back')"
        to="/"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('about.title') }}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container>
        <v-tabs v-model="active">
          <v-tab>App</v-tab>
          <v-tab>Tech</v-tab>
          <v-tab>Data</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  This app is a personal project to learn Vue.
                </p>
                <p>
                  Countries data are fetched from a remote data source then displayed as map, grid or table and may be filtered/sorted.
                </p>
                <p>
                  The app is localized in English and French (except for data).
                </p>
                </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ul>
                  <li>Vue.js
                    <ul>
                      <li>Vue CLI including Webpack, ESLint</li>
                      <li>Vuex</li>
                      <li>Vue Router</li>
                      <li>Vue I18n</li>
                      <li>Vuetify with material icons</li>
                    </ul>
                  </li>
                  <li>Leaflet</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <i18n path="about.text.countriesData">
                  <a
                    href="https://restcountries.eu/"
                    target="_blank"
                  >
                    REST Countries
                  </a>
                </i18n>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'tab-App'
    }
  }
}
</script>
