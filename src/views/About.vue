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
          <v-tab>{{ $t('about.tab.app') }}</v-tab>
          <v-tab>{{ $t('about.tab.tech') }}</v-tab>
          <v-tab>{{ $t('about.tab.data') }}</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                  <p>
                    <i18n path="about.app.part1">
                      <a
                        href="https://github.com/vncntcltt/vue-countries"
                        target="_blank"
                      >
                        GitHub
                      </a>
                    </i18n>
                  </p>
                  <p> {{ $t('about.app.part2') }}</p>
                  <p> {{ $t('about.app.part3') }}</p>
                </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ul>
                  <li>Vue.js
                    <ul>
                      <li>Vue CLI incl. Webpack, ESLint</li>
                      <li>Vuex</li>
                      <li>Vue Router</li>
                      <li>Vue I18n</li>
                      <li>Vuetify + material icons</li>
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
                <i18n path="about.data.countriesData">
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

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class About extends Vue {
  active = 'tab-App'
}
</script>
