<template>
  <div>
    <v-select
      v-model="selectedSortField"
      @change="sortCountries"
      :label="$t('sorts.dataType')"
      :items="sortFields"
      dense
      class="pa-3 selection"
    >
    </v-select>
    <v-select
      v-model="selectedSortOrder"
      @change="sortCountries"
      :label="$t('sorts.order')"
      :items="sortOrders"
      dense
      class="pa-3 selection"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class CountrySorts extends Vue {
  sortFields!: any[]

  sortOrders!: any[]

  selectedSortField = 'name'

  selectedSortOrder = 'asc'

  created() {
    this.sortFields = [
      { text: this.$t('sorts.dataType.name'), value: 'name' },
      { text: this.$t('sorts.dataType.population'), value: 'population' },
      { text: this.$t('sorts.dataType.area'), value: 'area' }
    ]
    this.sortOrders = [
      { text: this.$t('sorts.order.ascending'), value: 'asc' },
      { text: this.$t('sorts.order.descending'), value: 'desc' }
    ]
  }

  sortCountries () {
    this.$store.commit('countries/sort', {
      field: this.selectedSortField,
      order: this.selectedSortOrder
    })
  }
}
</script>

<style scoped>
.selection {
  font-size: 14px;
}
</style>
