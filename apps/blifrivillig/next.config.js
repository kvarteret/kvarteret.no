const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["dak-components"]);
const withImages = require("next-images");
const { withPlaiceholder } = require("@plaiceholder/next");
module.exports = withPlugins([withTM(), withImages, withPlaiceholder], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {
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
  // Experimental features
  swcMinify: true
});