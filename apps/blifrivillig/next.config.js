const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["dak-components"]);
const withImages = require("next-images");
module.exports = withPlugins([withTM(), withImages], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {
    domains: ['cms.kvarteret.no'],
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'no'
  }
});