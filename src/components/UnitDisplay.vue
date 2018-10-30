<template>
    <span>{{ valueAndUnit }}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    val: Number
  },
  computed: {
    ...mapGetters({
      isImperialUnit: 'settings/isImperialUnit'
    }),
    valueAndUnit () {
      let tval = this.val
      if (this.isImperialUnit) {
        tval = this.$n(tval)
        return `${tval} sq mi`
      } else {
        tval = Math.round(2.59 * tval)
        tval = this.$n(tval)
        return `${tval} km²`
      }
    }
  }
}
</script>
