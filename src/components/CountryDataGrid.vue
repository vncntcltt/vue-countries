<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-data-iterator
      :items="countries"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <CountryCard :country="props.item" />
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import CountryCard from './CountryCard.vue'
import { Country } from '@/interfaces'

@Component({
  components: {
    CountryCard
  }
})
export default class CountryDataGrid extends Vue {
  @Prop() countries!: Country[]

  rowsPerPageItems = [
    4,
    8,
    16,
    { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
  ]

  pagination = {
    rowsPerPage: 8
  }
}
</script>
