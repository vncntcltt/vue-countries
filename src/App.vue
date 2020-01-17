<template>
  <div id="app">
    <v-app :dark="isDarkTheme">
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        fixed
        >
          <v-list v-if="regionData">

            <CountryNavigation />

            <v-divider />

            <v-list-tile to="/settings">
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ $t('settings.title') }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider />

            <v-list-tile to="/about">
              <v-list-tile-action>
                <v-icon>help</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ $t('about.title') }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          <p v-else></p>
      </v-navigation-drawer>

      <main>
        <router-view @toggle-drawer="drawer = !drawer"></router-view>
      </main>

      <v-footer app>
        <v-layout justify-center>
          <span v-html="$t('footer.info')"></span>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import CountryNavigation from './components/CountryNavigation'
import Countries from './views/Countries'

export default {
  components: {
    CountryNavigation
  },
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme
    }),
    ...mapGetters({
      regionData: 'countries/getRegionData',
      isDarkTheme: 'settings/isDarkTheme'
    }),
    countryDisplayComponent () {
      switch (this.countryDisplayType) {
        case 'grid':
          return 'CountryDataGrid'
        case 'map':
          return 'CountryMap'
        case 'table':
          return 'CountryDataTable'
      }
      return 'grid'
    }
  }
}
</script>
