<template>
  <v-card>
    <v-card-title primary-title class="countryCardTitle">
      <img
        :src="country.flag"
        height="32px"
      >
      <h3
        class="headline pl-3"
        :title="country.name"
      >
        {{ country.name }}
      </h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list
      two-line
      dense
    >
      <!-- <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ $t('country.label.code') }}</v-list-tile-sub-title>
          <v-list-tile-title>{{ country.alpha3Code }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>  -->
      <v-list-tile>
        <v-container class="pa-0">
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $t('country.label.region') }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ country.region }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $t('country.label.subregion') }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ country.subregion | displayNAIfEmpty }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-tile>
      <v-list-tile>
        <v-container class="pa-0">
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $t('country.label.capital') }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ country.capital | displayNAIfEmpty }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6 >
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $tc('country.label.regionalBlocs', country.regionalBlocs.length) }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ countryRegionalBlocs | displayNAIfEmpty }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-tile>
      <v-list-tile>
        <v-container class="pa-0">
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $t('country.label.population') }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ $n(country.population) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6 >
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $t('country.label.area') }}</v-list-tile-sub-title>
                <v-list-tile-title><UnitDisplay :val="country.area" /></v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-tile>
      <v-list-tile>
        <v-container class="pa-0">
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $tc('country.label.currencies', country.currencies.length) }}</v-list-tile-sub-title>
                <v-list-tile-title :title="countryCurrencies" class="wrapLongList">{{ countryCurrencies }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6 >
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ $tc('country.label.languages', country.languages.length) }}</v-list-tile-sub-title>
                <v-list-tile-title :title="countryLanguages" class="wrapLongList">{{ countryLanguages }}</v-list-tile-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-tile>
      <!-- <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ $tc('country.label.timezones', country.timezones.length) }}</v-list-tile-sub-title>
          <v-list-tile-title :title="countryTimezones">{{ countryTimezones }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>                                                                                   -->
    </v-list>
    <v-divider></v-divider>
    <v-layout justify-end>
      <slot></slot>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import UnitDisplay from './UnitDisplay.vue'
import { Country } from '@/interfaces'

@Component({
  components: {
    UnitDisplay
  },
  filters: {
    displayNAIfEmpty (value: string) {
      if (!value) {
        return 'N/A'
      }
      return value
    }
  }
})
export default class CountryCard extends Vue {
  @Prop() country!: Country

  get countryRegionalBlocs () {
    return this.country.regionalBlocs.map(r => r.name).join(', ')
  }
  get countryLanguages () {
    return this.country.languages.map(l => l.name).join(', ')
  }
  get countryCurrencies () {
    return this.country.currencies
      .map(c => `${c.name} (${c.code})`)
      .join(', ')
  }
  get countryTimezones () {
    return this.country.timezones.join(', ')
  }
}
</script>

<style scoped>
.countryCardTitle {
  flex-wrap: nowrap;
}
.countryCardTitle .headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
