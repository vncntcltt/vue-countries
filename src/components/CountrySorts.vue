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

<script>
export default {
  data () {
    return {
      sortFields: [
        { text: this.$t('sorts.dataType.name'), value: 'name' },
        { text: this.$t('sorts.dataType.population'), value: 'population' },
        { text: this.$t('sorts.dataType.area'), value: 'area' }
      ],
      sortOrders: [
        { text: this.$t('sorts.order.ascending'), value: 'asc' },
        { text: this.$t('sorts.order.descending'), value: 'desc' }
      ],
      selectedSortField: 'name',
      selectedSortOrder: 'asc'
    }
  },
  methods: {
    sortCountries () {
      this.$store.commit('countries/sort', {
        field: this.selectedSortField,
        order: this.selectedSortOrder
      })
    }
  }
}
</script>

<style scoped>
.selection {
  font-size: 14px;
}
</style>
