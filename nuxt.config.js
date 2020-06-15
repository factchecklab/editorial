require('dotenv').config()

module.exports = {
  mode: process.env.NUXT_MODE || 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Factcheck Lab',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/apollo' }, { src: '~/plugins/vuelidate' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        locales: ['zh-hk', 'en'],
        defaultLocale: 'zh-hk',
        vueI18n: {
          fallbackLocale: 'zh-hk',
          messages: {
            en: require('./i18n/en.json'),
            'zh-hk': require('./i18n/zh-hk.json')
          },
          silentFallbackWarn: true
        },
        strategy: 'prefix_and_default'
      }
    ],
    '@nuxtjs/sentry'
  ],
  /*
   ** Build configuration
   */
  build: {
    babel: {
      // envName: server, client, modern
      presets({ envName }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  },
  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  env: {
    GRAPHQL_HTTP_ENDPOINT:
      process.env.GRAPHQL_HTTP_ENDPOINT ||
      'https://api.factchecklab.org/graphql/editorial',
    GRAPHQL_BROWSER_HTTP_ENDPOINT:
      process.env.GRAPHQL_BROWSER_HTTP_ENDPOINT || null,
    GRAPHQL_WS_ENDPOINT: process.env.GRAPHQL_WS_ENDPOINT || null,
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
}
