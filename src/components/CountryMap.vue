<template>
    <div id="map" class="map">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import L from 'leaflet'

import countriesGeoJson from '../data/countries.geo.json'
import { Country } from '@/interfaces'

@Component
export default class CountryMap extends Vue {

  @Prop() countries!: Country[]

  map: any = null

  countriesLayer: any = null

  @Watch('countries') onCountriesChange () {
    this.addCountriesLayer()
  }

  mounted () {
    this.initMap()
    this.addCountriesLayer()
  }

  initMap () {
    this.map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  }

  addCountriesLayer () {
    const countries = this.countries;
    if (this.map.hasLayer(this.countriesLayer)) {
      this.countriesLayer.remove()
    }
    this.countriesLayer = L.geoJSON(countriesGeoJson, {
      filter: (feature, layer) => {
        if (!countries) {
          return false;
        }
        const countryIds = countries.map(c => c.alpha3Code)
        return countryIds.includes(feature.id)
      },
      onEachFeature: (feature, layer) => {
        const featureCountry = this.countries.find(
          country => country.alpha3Code === feature.id
        )
        if (featureCountry) {
          layer.on('click', e => {
            this.$emit('select-country', featureCountry)
          })
          layer.bindTooltip('<strong>' + featureCountry.name + '</strong>')
        }
      }
    })
    this.countriesLayer.addTo(this.map)
    let bounds = this.countriesLayer.getBounds()
    if (bounds.isValid()) {
      this.map.fitBounds(bounds)
    } else {
      this.map.setView([0, 0], 2)
    }
  }

}
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
.map {
  height: 800px;
  z-index: 1;
}
</style>
