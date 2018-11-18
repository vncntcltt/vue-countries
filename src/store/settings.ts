const DARK_THEME = 'dark'
const IMPERIAL_UNIT = 'imperial'

interface SettingsState {
  unit: string
  theme: string
}

export default {
  namespaced: true,
  state: {
    unit: 'metric',
    theme: 'light'
  },
  getters: {
    isDarkTheme (state: SettingsState) {
      return state.theme === DARK_THEME
    },
    isImperialUnit (state: SettingsState): boolean {
      return state.unit === IMPERIAL_UNIT
    }
  },
  mutations: {
    setTheme (state: SettingsState, theme: string) {
      state.theme = theme
    },
    setUnit (state: SettingsState, unit: string) {
      state.unit = unit
    }
  }
}
