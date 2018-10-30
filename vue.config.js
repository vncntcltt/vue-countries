module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-countries/'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
