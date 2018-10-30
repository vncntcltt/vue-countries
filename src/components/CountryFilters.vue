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

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedRegionalBloc: '',
      selectedLanguages: []
    }
  },
  computed: {
    ...mapGetters({
      regionalBlocs: 'countries/getRegionalBlocs',
      languages: 'countries/getLanguages'
    }),
    regionalBlocItems () {
      return this.buildSelectItems(this.regionalBlocs)
    },
    languageItems () {
      return this.buildSelectItems(this.languages)
    }
  },
  methods: {
    filterCountries () {
      this.$store.commit('countries/filter', {
        regionalBloc: this.selectedRegionalBloc,
        languages: this.selectedLanguages
      })
    },
    buildSelectItems (values) {
      const items = []
      for (let val of values) {
        items.push({ text: val, value: val })
      }
      return items
    }
  }
}
</script>

<style scoped>
.selection {
  font-size: 14px;
}
</style>
