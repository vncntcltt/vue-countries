<template>
  <div>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.native="$emit('toggle-drawer')"></v-toolbar-side-icon>
      <v-toolbar-title v-t="'countries.title'"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        @input="searchCountries"
        @click:clear="searchText = null; searchCountries()"
        flat
        hide-details
        :label="$t('toolbar.label.search')"
        prepend-inner-icon="search"
        clearable
        class="hidden-sm-and-down"
      >
      </v-text-field>

      <v-btn
        @click="setDisplayType('map')"
        icon
        :title="$t('countries.toolbar.map')"
      >
        <v-icon :color="countryDisplayType === 'map' ? 'blue' : ''">map</v-icon>
      </v-btn>
      <v-btn
        icon
        :title="$t('countries.toolbar.grid')"
        @click="setDisplayType('grid')"
      >
        <v-icon :color="countryDisplayType === 'grid' ? 'blue' : ''">grid_on</v-icon>
      </v-btn>
      <v-btn
        @click="setDisplayType('table')"
        icon
        :title="$t('countries.toolbar.table')"
      >
        <v-icon :color="countryDisplayType === 'table' ? 'blue' : ''">table_chart</v-icon>
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn
        @click="showInfo = !showInfo"
        icon
        :title="$t('countries.toolbar.info')"
      >
        <v-icon :color="showInfo ? 'blue' : ''">info</v-icon>
      </v-btn>

    </v-toolbar>
    <v-content>
      <div v-if="countries">
        <CountryStatistics v-if="showInfo" />
        <keep-alive>
            <component
              :is="countryDisplayComponent"
              :countries="filteredCountries"
              @select-country="selectedCountry = $event; countryCardDialog = true"
            >
            </component>
        </keep-alive>

      </div>
      <p
        v-else-if="error"
        v-t="'content.message.dataFetchError'"
        class="error"
      ></p>
      <p
        v-else v-t="'content.message.dataLoading'"
        class="ma-3"
      ></p>

      <v-dialog
        v-model="countryCardDialog"
        width="500"
        lazy
      >
        <CountryCard
          v-if="selectedCountry"
          :country="selectedCountry"
        >
          <v-btn
            color="primary"
            flat
            @click="countryCardDialog = false"
            v-t="'dialog.button.close'"
          >
          </v-btn>
        </CountryCard>
      </v-dialog>
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'

import CountryDataGrid from '../components/CountryDataGrid.vue'
import CountryMap from '../components/CountryMap.vue'
import CountryDataTable from '../components/CountryDataTable.vue'
import CountryCard from '../components/CountryCard.vue'
import CountryStatistics from '../components/CountryStatistics.vue'

@Component({
  components: {
    CountryDataGrid,
    CountryMap,
    CountryDataTable,
    CountryCard,
    CountryStatistics
  }
})
export default class Countries extends Vue {
  selectedCountry = null

  searchText = null

  countryCardDialog = false

  showInfo = false

  @State(state => state.countries.allCountries) countries

  @State(state => state.countries.error) error

  @State(state => state.countries.displayType) countryDisplayType

  @Getter('countries/getFilteredCountries') filteredCountries

  get countryDisplayComponent () {
    switch (this.countryDisplayType) {
      case 'grid':
        return 'CountryDataGrid'
      case 'map':
        return 'CountryMap'
      case 'table':
        return 'CountryDataTable'
    }
  }

  created () {
    this.$store.dispatch('countries/getCountries')
  }

  searchCountries () {
    this.$store.commit('countries/search', this.searchText)
  }

  setDisplayType (displayType) {
    this.$store.commit('countries/setDisplayType', displayType)
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
