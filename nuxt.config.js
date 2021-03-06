export default {
  target: 'static',
  head: {
    title: 'PublicCode Directory',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'The federated DataBase of Open Source Software used by public institutions',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'federated, DataBase, Open Source Software, public institutions',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/logo.png' }],
    bodyAttrs: {
      class: 'is-grid',
    },
  },
  css: ['~/assets/scss/app'],
  plugins: [
    '~/plugins/truncate',
    '~/plugins/capitalize',
    { src: '~/plugins/validate.js', mode: 'client' },
  ],
  pwa: {
    icon: {
      source: './static/img/logo.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: 'PublicCode Directory',
      short_name: 'PCD',
      description:
        'The federated DataBase of Open Source Software used by public institutions',
      lang: 'en',
      theme_color: '#4DBA87',
      useWebManifestExtension: false,
      startUrl: '/',
    },
  },
  telemetry: true,
  components: true,
  buildModules: ['@nuxt/components', '@nuxt/typescript-build'],
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-leaflet',
    '@nuxt/content',
  ],
  modern: process.env.NODE_ENV === 'production',
  generate: {
    fallback: true,
  },
  render: {
    http2: {
      push: false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pushAssets: (req, res, publicPath, preloadFIles) =>
        preloadFIles
          .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
          .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },
  axios: {},
  content: {
    // nestedProperties: ['author.name'],
    markdown: {
      // https://github.com/remarkjs/remark-external-links#options
      remarkExternalLinks: {
        target: '_self',
        rel: 'nofollow noopener',
      },
    },
  },
  build: {
    babel: {
      presets: [
        [
          '@nuxt/babel-preset-app',
          {
            corejs: 3,
          },
        ],
      ],
    },
    transpile: ['vee-validate/dist/rules'],
  },
  extend(config, ctx) {
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true,
        },
      })
    }
  },
}
