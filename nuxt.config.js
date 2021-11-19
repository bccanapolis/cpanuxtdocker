const manifest = {
  name: "IFG Comissão Própria de Avaliação",
  short_name: "IFG CPA",
  description:
    "Plataforma de questionários e relatórios da Comissão Própria de Avaliação do Instituto Federal de Goiás.",
  lang: "pt",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#79b334",
  site_url: "http://cpa.bcc.anapolis.ifg.edu.br",
  keywords: [
    "questionarios",
    "relatorio",
    "ifg",
    "perguntas",
    "repostas",
    "cpa",
    "comissão",
    "própria",
    "avaliação"
  ]
};

export default {
  target: "static",
  generate: {
    routes: [
      "/questionario/s4UkHMQC",
      "/questionario/zc3WsGum",
      "/questionario/4jn7qduk",
      "/questionario/g3YTAfpT"
    ]
    // exclude: [/\^\/questionario/]
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "pt-br"
    },
    title: manifest["name"],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: manifest["description"]
      },

      // open graph / facebook
      { property: "og:type", content: "website" },
      { property: "og:title", content: manifest["name"] },
      { property: "og:site_name", content: manifest["name"] },
      { property: "og:description", content: manifest["description"] },

      {
        property: "og:image",
        content: `${manifest["site_url"]}/img/metaimage_app.png`
      },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "628" },
      //
      {
        property: "og:image",
        itemprop: "image",
        content: `${manifest["site_url"]}/img/metaimage_app_whatsapp.png`
      },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "400" },
      { property: "og:image:height", content: "400" },

      // twitter
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: manifest["site_url"] },
      { property: "twitter:title", content: manifest["name"] },
      { property: "twitter:description", content: manifest["description"] },
      {
        property: "twitter:image",
        content: `${manifest["site_url"]}/img/metaimage_app.png`
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "/css/animate.min.css" },
      { rel: "stylesheet", href: "/css/light-bootstrap-dashboard.css?v=1.4.0" },
      {
        rel: "stylesheet",
        href:
          "https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:400,700,300"
      },
      { rel: "stylesheet", href: "/css/pe-icon-7-stroke.css" }
    ],
    script: [
      { src: "/js/jquery.3.2.1.min.js", type: "text/javascript" },
      { src: "/js/bootstrap.min.js", type: "text/javascript" },
      { src: "/js/bootstrap-notify.js", type: "text/javascript" },
      {
        src: "/js/light-bootstrap-dashboard.js?v=1.4.0",
        type: "text/javascript"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~plugins/apexcharts-plugin.js", mode: "client" }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-158720692-1"
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env["API_HOST"] || "http://127.0.0.1:8000/v1"
  },

  env: {
    QUEST_END_DATE: process.env["QUEST_END_DATE"],
    QUEST_START_DATE: process.env["QUEST_START_DATE"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
