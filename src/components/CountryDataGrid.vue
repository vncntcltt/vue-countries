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

<script>
import CountryCard from './CountryCard'

export default {
  components: {
    CountryCard
  },
  props: {
    countries: Array
  },
  data () {
    return {
      rowsPerPageItems: [
        4,
        8,
        16,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ],
      pagination: {
        rowsPerPage: 8
      }
    }
  }
}
</script>
