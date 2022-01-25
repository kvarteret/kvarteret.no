const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["dak-components"]);
const withImages = require("next-images");
module.exports = withPlugins([withTM(), withImages], {
  images: {
    disableStaticImages: true,
    domains: ['cms.kvarteret.no'],
  },
  rewrites: async () => [
    {
      source: "/files/:id",
      destination: "https://cms.kvarteret.no/assets/:id"
    }
  ],
  reactStrictMode: true,
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'no',
    localeDetection: false,
    domains: [{
      domain: "kvarteret.no",
      defaultLocale: "no"
    }]
  },
  trailingSlash: true
});