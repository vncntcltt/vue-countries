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
      tval = Math.round(tval / 2.59)
      const nval = this.$n(tval)
      return `${nval} sq mi`
    } else {
      const nval = this.$n(tval)
      return `${nval} km²`
    }
  }
}
</script>
