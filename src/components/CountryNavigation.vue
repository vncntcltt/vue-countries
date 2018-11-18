<template>
  <div v-if="regionData">

    <v-list-group value="true">

      <v-list-tile
        slot="activator"
        to="/countries"
      >
        <v-list-tile-action>
          <v-icon>flag</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('countries.title') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        v-for="regionItem in regionItems"
        :key="regionItem.name"
        sub-group
        no-action
      >
        <v-list-tile
          slot="activator"
          :to="`/countries/${regionItem.name}`"
        >
          <v-list-tile-title>{{ regionItem.name }}</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="subregionItem in regionItem.items"
          :key="subregionItem.name"
          :to="`/countries/${regionItem.name}/${subregionItem.name}`"
        >
          <v-list-tile-title>{{ subregionItem.name }}</v-list-tile-title>
        </v-list-tile>

      </v-list-group>

        <v-list-tile >
          <v-list-tile-action>
            <v-icon>filter_list</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('filters.header') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <CountryFilters />

        <template v-if="showSorts">
          <v-list-tile >
            <v-list-tile-action>
              <v-icon>sort</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ $t('sorts.header') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <CountrySorts />

        </template>

    </v-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import CountryFilters from './CountryFilters.vue'
import CountrySorts from './CountrySorts.vue'

@Component({
  components: {
    CountryFilters,
    CountrySorts
  }
})
export default class CountryNavigation extends Vue {

  regionItems = null

  @Getter('countries/getRegionData') regionData

  @Getter('countries/showSorts') showSorts

  @Watch('regionData') onRegionDataChange () {
    this.regionItems = this.buildRegionItems()
  }

  @Watch('$route') onRouteChange (to, from) {
    this.$store.commit('countries/navigate', { region: to.params.region, subregion: to.params.subregion })
  }

  buildRegionItems () {
    return this.regionData.regions.map(region => {
      return {
        name: region,
        items: this.regionData.subregionsByRegion[region].map(subregion => {
          return {
            name: subregion
          }
        })
      }
    })
  }
}
</script>
