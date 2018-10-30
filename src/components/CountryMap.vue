<template>
    <div id="map" class="map">
    </div>
</template>

<script>
import L from 'leaflet'
import countriesGeoJson from '../data/countries.geo.json'

export default {
  props: {
    countries: Array
  },
  data () {
    return {
      map: null,
      countriesLayer: null,
      countriesGeoJson: countriesGeoJson
    }
  },
  watch: {
    countries () {
      this.addCountriesLayer()
    }
  },
  mounted () {
    this.initMap()
    this.addCountriesLayer()
  },
  methods: {
    initMap () {
      this.map = L.map('map').setView([0, 0], 2)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)
    },
    addCountriesLayer () {
      if (this.map.hasLayer(this.countriesLayer)) {
        this.countriesLayer.remove()
      }
      this.countriesLayer = L.geoJSON(this.countriesGeoJson, {
        filter: this.countryFilter,
        onEachFeature: (feature, layer) => {
          const featureCountry = this.countries.find(
            country => country.alpha3Code === feature.id
          )
          layer.on('click', e => {
            if (featureCountry) {
              this.$emit('select-country', featureCountry)
            }
          })
          layer.bindTooltip('<strong>' + featureCountry.name + '</strong>')
        }
      })
      this.countriesLayer.addTo(this.map)
      let bounds = this.countriesLayer.getBounds()
      if (bounds.isValid()) {
        this.map.fitBounds(bounds)
      } else {
        this.map.setView([0, 0], 2)
      }
    },
    countryFilter (feature) {
      const countryIds = this.countries.map(c => c.alpha3Code)
      return countryIds.includes(feature.id)
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
