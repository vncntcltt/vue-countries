<template>
    <span>{{ valueAndUnit }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class UnitDisplay extends Vue {
  @Prop() val!: number

  @Getter('settings/isImperialUnit') isImperialUnit

  get valueAndUnit () {
    let tval = this.val
    if (this.isImperialUnit) {
      const nval = this.$n(tval)
      return `${nval} sq mi`
    } else {
      tval = Math.round(2.59 * tval)
      const nval = this.$n(tval)
      return `${nval} km²`
    }
  }
}
</script>
