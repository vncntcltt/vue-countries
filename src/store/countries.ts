import countryApi from '../api/countryApi'

const SORTABLE_DISLAY_TYPES = ['grid']

export default {
  namespaced: true,
  state: {
    allCountries: [],
    filterRegion: null,
    filterSubregion: null,
    filterRegionalBloc: null,
    filterLanguages: null,
    filterName: null,
    sortField: null,
    sortOrder: null,
    error: null,
    displayType: 'map'
  },
  getters: {
    getFilteredCountries (state) {
      const sortAndFilters = {
        filterRegion: state.filterRegion,
        filterSubregion: state.filterSubregion,
        filterRegionalBloc: state.filterRegionalBloc,
        filterLanguages: state.filterLanguages,
        filterName: state.filterName,
        sortField: state.sortField,
        sortOrder: state.sortOrder
      }
      return countryApi.filterAndSortCountries(
        state.allCountries,
        sortAndFilters
      )
    },
    getRegionData (state) {
      return countryApi.buildRegionData(state.allCountries)
    },
    getRegionalBlocs (state, getters) {
      return getters.getRegionData.regionalBlocs
    },
    getLanguages (state, getters) {
      return getters.getRegionData.languages
    },
    getCountryByCode (state, code) {
      return state.allCountries.find(country => country.alpha3Code === code)
    },
    countryCount (state) {
      return state.allCountries.length
    },
    populationSum (state) {
      return state.allCountries
        .map(c => c.population)
        .reduce((p1, p2) => p1 + p2, 0)
    },
    areaSum (state) {
      return Math.round(
        state.allCountries.map(c => c.area).reduce((p1, p2) => p1 + p2, 0)
      )
    },
    filteredCountryCount (state, getters) {
      return getters.getFilteredCountries.length
    },
    filteredPopulationSum (state, getters) {
      return getters.getFilteredCountries
        .map(c => c.population)
        .reduce((p1, p2) => p1 + p2, 0)
    },
    filteredAreaSum (state, getters) {
      return Math.round(
        getters.getFilteredCountries
          .map(c => c.area)
          .reduce((p1, p2) => p1 + p2, 0)
      )
    },
    countPct (state, getters) {
      return (getters.filteredCountryCount / getters.countryCount) * 100
    },
    populationPct (state, getters) {
      return (getters.filteredPopulationSum / getters.populationSum) * 100
    },
    areaPct (state, getters) {
      return (getters.filteredAreaSum / getters.areaSum) * 100
    },
    showSorts (state) {
      return SORTABLE_DISLAY_TYPES.includes(state.displayType)
    }
  },
  mutations: {
    navigate (state, { region, subregion }) {
      state.filterRegion = region
      state.filterSubregion = subregion
    },
    filter (state, { regionalBloc, languages }) {
      state.filterRegionalBloc = regionalBloc
      state.filterLanguages = languages
    },
    search (state, name) {
      state.filterName = name
    },
    sort (state, { field, order }) {
      state.sortField = field
      state.sortOrder = order
    },
    setAllCountries (state, allCountries) {
      state.allCountries = allCountries
    },
    setError (state, error) {
      state.error = error
    },
    setDisplayType (state, displayType) {
      state.displayType = displayType
    }
  },
  actions: {
    getCountries ({ commit }) {
      return countryApi
        .getCountries()
        .then(res => res.json())
        .then(countries => {
          commit('setAllCountries', countries)
        })
        .catch(error => {
          commit('setError', error)
        })
    }
  }
}
