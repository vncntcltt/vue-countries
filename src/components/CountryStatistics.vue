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

<script>
import UnitDisplay from './UnitDisplay'
import { mapGetters } from 'vuex'

export default {
  components: {
    UnitDisplay
  },
  filters: {
    displayPct (value) {
      if (Number.isInteger(value)) {
        return value + '%'
      } else {
        return value.toFixed(2) + '%'
      }
    }
  },
  computed: mapGetters('countries', [
    'filteredCountryCount',
    'countPct',
    'filteredPopulationSum',
    'populationPct',
    'filteredAreaSum',
    'areaPct'
  ])
}
</script>
