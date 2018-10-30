<template>
  <div>
    <v-toolbar
      app
      clipped-left
    >
      <v-btn
        icon
        :title="$t('toolbar.label.back')"
        to="/"
        >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('settings.title') }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-select
          v-model="selectedLanguage"
          :label="$t('settings.label.language')"
          :items="languages"
          @change="setLocale"
        >
        </v-select>
        <v-select
          v-model="unit"
          :label="$t('settings.label.units')"
          :items="units"
        >
        </v-select>
        <v-select
          v-model="theme"
          :label="$t('settings.label.theme')"
          :items="themes"
        >
        </v-select>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      units: [
        { text: this.$t('settings.units.metric'), value: 'metric' },
        { text: this.$t('settings.units.imperial'), value: 'imperial' }
      ],
      themes: [
        { text: this.$t('settings.theme.light'), value: 'light' },
        { text: this.$t('settings.theme.dark'), value: 'dark' }
      ],
      languages: [
        { text: 'English', value: 'en' },
        { text: 'Français', value: 'fr' }
      ],
      selectedLanguage: this.$i18n.locale
    }
  },
  computed: {
    unit: {
      get () {
        return this.$store.state.settings.unit
      },
      set (value) {
        this.$store.commit('settings/setUnit', value)
      }
    },
    theme: {
      get () {
        return this.$store.state.settings.theme
      },
      set (value) {
        this.$store.commit('settings/setTheme', value)
      }
    }
  },
  methods: {
    setLocale (lang) {
      this.$i18n.locale = lang
      this.$vuetify.lang.current = lang
    }
  }
}
</script>
