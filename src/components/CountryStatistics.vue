<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
          <v-flex text-xs-center>
            <div class="subheading">{{ filteredCountryCount }} {{ $tc('statistics.text.countries', this.filteredCountryCount) }} </div>
            <div class="caption">{{ countPct | displayPct }} {{ $t('statistics.subtext.worldCountries') }}</div>
          </v-flex>
          <v-flex text-xs-center>
            <div class="subheading">{{ $n(filteredPopulationSum) }} {{ $t('statistics.text.people') }}</div>
            <div class="caption">{{ populationPct | displayPct }} {{ $t('statistics.subtext.worldPopulation') }}</div>
          </v-flex>
          <v-flex text-xs-center>
            <div class="subheading"><UnitDisplay :val="filteredAreaSum" /></div>
            <div class="caption">{{ areaPct | displayPct }} {{ $t('statistics.subtext.worldArea') }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import UnitDisplay from './UnitDisplay.vue'

@Component({
  components: {
    UnitDisplay
  },
  filters: {
    displayPct (value: number) {
      if (Number.isInteger(value)) {
        return value + '%'
      } else {
        return value.toFixed(2) + '%'
      }
    }
  }
})
export default class CountryStatistics extends Vue {
  @Getter('countries/filteredCountryCount') filteredCountryCount

  @Getter('countries/countPct') countPct

  @Getter('countries/filteredPopulationSum') filteredPopulationSum

  @Getter('countries/populationPct') populationPct

  @Getter('countries/filteredAreaSum') filteredAreaSum

  @Getter('countries/areaPct') areaPct
}
</script>
