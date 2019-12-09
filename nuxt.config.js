export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Comissão Própria de Avaliação',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'css/bootstrap.min.css'},
      {rel: 'stylesheet', href: 'css/animate.min.css'},
      {rel: 'stylesheet', href: 'css/light-bootstrap-dashboard.css?v=1.4.0'},
      {rel: 'stylesheet', href: 'http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'},
      {rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Roboto:400,700,300'},
      {rel: 'stylesheet', href: 'css/pe-icon-7-stroke.css'},
    ],
    script: [
      {src:'js/jquery.3.2.1.min.js', type: 'text/javascript'},
      {src:'js/bootstrap.min.js', type: 'text/javascript'},
      {src:'js/bootstrap-notify.js', type: 'text/javascript'},
      {src:'js/light-bootstrap-dashboard.js?v=1.4.0', type: 'text/javascript'},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/apexcharts-plugin.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://api.cpa.bcc.anapolis.ifg.edu.br/api'
    // baseURL: 'http://localhost:8000/api'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
