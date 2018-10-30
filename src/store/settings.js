const DARK_THEME = 'dark'
const IMPERIAL_UNIT = 'imperial'

export default {
  namespaced: true,
  state: {
    unit: 'metric',
    theme: 'light'
  },
  getters: {
    isDarkTheme (state) {
      return state.theme === DARK_THEME
    },
    isImperialUnit (state) {
      return state.unit === IMPERIAL_UNIT
    }
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    setUnit (state, unit) {
      state.unit = unit
    }
  }
}
