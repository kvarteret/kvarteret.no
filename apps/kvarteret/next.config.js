const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["dak-components"]);
const withImages = require("next-images");
module.exports = withPlugins([withTM(), withImages], {
  images: {
    disableStaticImages: true,
    domains: ['cms.kvarteret.no'],
  },
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