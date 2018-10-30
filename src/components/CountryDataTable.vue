<template>
  <v-data-table
    :headers="headers"
    :items="countries"
    item-key="name"
    :pagination.sync="pagination"
    :rows-per-page-items="rowsPerPageItems"
    class="elevation-1"
  >
    <template
      slot="items"
      slot-scope="props"
    >
      <tr @click="$emit('select-country', props.item)">
        <td>{{ props.item.name }}</td>
        <td class="text-xs">{{ props.item.region }}</td>
        <td class="text-xs">{{ props.item.subregion }}</td>
        <td class="text-xs">{{ props.item.capital }}</td>
        <td class="text-xs-right">{{ $n(props.item.population) }}</td>
        <td class="text-xs-right"><UnitDisplay :val="props.item.area" /></td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import UnitDisplay from './UnitDisplay'

export default {
  components: {
    UnitDisplay
  },
  props: {
    countries: Array
  },
  data () {
    return {
      headers: [
        { text: this.$t('country.label.name'), align: 'left', value: 'name' },
        { text: this.$t('country.label.region'), value: 'region' },
        { text: this.$t('country.label.subregion'), value: 'subregion' },
        { text: this.$t('country.label.capital'), value: 'capital' },
        {
          text: this.$t('country.label.population'),
          align: 'right',
          value: 'population'
        },
        { text: this.$t('country.label.area'), align: 'right', value: 'area' }
      ],
      rowsPerPageItems: [
        10,
        15,
        25,
        50,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ],
      pagination: {
        rowsPerPage: 15
      }
    }
  }
}
</script>
