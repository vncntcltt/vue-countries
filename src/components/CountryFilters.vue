<template>
  <div>
    <v-select
      v-model="selectedRegionalBloc"
      @change="filterCountries"
      :label="$t('filters.label.regionalBloc')"
      :placeholder="$t('filters.placeholder.all')"
      clearable
      :items="regionalBlocItems"
      :disabled="regionalBlocItems.length <= 1"
      dense
      class="pa-3 selection"
    >
    </v-select>

    <v-select
      v-model="selectedLanguages"
      @change="filterCountries"
      chips
      multiple
      clearable
      :label="$t('filters.label.languages')"
      :placeholder="$t('filters.placeholder.all')"
      :items="languageItems"
      :disabled="languageItems.length <= 1"
      dense
      class="pa-3 selection"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class CountryFilters extends Vue {

  selectedRegionalBloc = ''

  selectedLanguages = []

  @Getter('countries/getRegionalBlocs') regionalBlocs

  @Getter('countries/getLanguages') languages

  get regionalBlocItems () {
    return this.buildSelectItems(this.regionalBlocs)
  }

  get languageItems () {
    return this.buildSelectItems(this.languages)
  }

  filterCountries () {
    this.$store.commit('countries/filter', {
      regionalBloc: this.selectedRegionalBloc,
      languages: this.selectedLanguages
    })
  }

  buildSelectItems (values: string[]) {
    const items: {text: string, value: string}[] = []
    for (let val of values) {
      items.push({ text: val, value: val })
    }
    return items
  }
}
</script>

<style scoped>
.selection {
  font-size: 14px;
}
</style>
