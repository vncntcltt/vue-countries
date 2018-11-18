const COUNTRIES_API_URL = 'https://restcountries.eu/rest/v2/all'
const ASC_ORDER = 'asc'
const DATA_STR_FIELDS = ['name']
const DATA_NUM_FIELDS = ['population', 'area']
const DATA_LOCALE = 'en'

export default {

  getCountries () {
    return fetch(COUNTRIES_API_URL)
  },

  buildRegionData (countries) {
    const regions: string[] = []
    const subregions: string[] = []
    const subregionsByRegion: {[key: string]: string[]} = {}
    const regionalBlocBySize: {[key: string]: number} = {}
    let regionalBlocs: string[] = []
    const languageBySize = {}
    let languages: string[] = []
    for (let country of countries) {
      let { region, subregion } = country
      if (region && !regions.includes(region)) {
        regions.push(region)
      }
      if (subregionsByRegion[region] === undefined) {
        subregionsByRegion[region] = []
      }
      if (subregion && !subregions.includes(subregion)) {
        subregions.push(subregion)
        if (!subregionsByRegion[region].includes(subregion)) {
          subregionsByRegion[region].push(subregion)
        }
      }
      country.regionalBlocs.forEach(rb => {
        let regionalBlocName = rb.name
        if (!regionalBlocBySize[regionalBlocName]) {
          regionalBlocBySize[regionalBlocName] = 1
        } else {
          regionalBlocBySize[regionalBlocName]++
        }
      })
      regionalBlocs = Object.keys(regionalBlocBySize)
      regionalBlocs.sort(
        (rb1, rb2) => regionalBlocBySize[rb2] - regionalBlocBySize[rb1]
      )
      country.languages.forEach(l => {
        let languageName = l.name
        if (!languageBySize[languageName]) {
          languageBySize[languageName] = 1
        } else {
          languageBySize[languageName]++
        }
      })
      languages = Object.keys(languageBySize)
      languages.sort((l1, l2) => languageBySize[l2] - languageBySize[l1])
    }
    return {
      regions,
      subregions,
      subregionsByRegion,
      regionalBlocs,
      languages
    }
  },

  filterAndSortCountries (countries, sortAndFilters) {
    const filteredCountries = countries.filter(country => {
      if (
        sortAndFilters.filterRegion &&
        country.region !== sortAndFilters.filterRegion
      ) {
        return false
      }
      if (
        sortAndFilters.filterSubregion &&
        country.subregion !== sortAndFilters.filterSubregion
      ) {
        return false
      }
      if (
        sortAndFilters.filterRegionalBloc &&
        !country.regionalBlocs.find(
          rb => rb.name === sortAndFilters.filterRegionalBloc
        )
      ) {
        return false
      }
      if (
        sortAndFilters.filterLanguages &&
        sortAndFilters.filterLanguages.length &&
        !country.languages.find(l =>
          sortAndFilters.filterLanguages.includes(l.name)
        )
      ) {
        return false
      }
      if (sortAndFilters.filterName) {
        const lname = sortAndFilters.filterName.toLowerCase()
        let countryNameParts = country.name
          .toLowerCase()
          .split(/,|'| /)
          .map(part => part.trim())
        let countryNameMatches = false
        for (let part of countryNameParts.filter(part => part.length > 3)) {
          if (part.startsWith(lname)) {
            countryNameMatches = true
            break
          }
        }
        if (!countryNameMatches) {
          return false
        }
      }
      return true
    })

    if (sortAndFilters.sortField && sortAndFilters.sortOrder) {
      filteredCountries.sort((a, b) => {
        let res = 1
        if (DATA_STR_FIELDS.includes(sortAndFilters.sortField)) {
          res = a[sortAndFilters.sortField].localeCompare(
            b[sortAndFilters.sortField],
            DATA_LOCALE
          )
        } else if (DATA_NUM_FIELDS.includes(sortAndFilters.sortField)) {
          res = a[sortAndFilters.sortField] - b[sortAndFilters.sortField]
        }
        return sortAndFilters.sortOrder === ASC_ORDER ? res : -res
      })
    }

    return filteredCountries
  }
}
