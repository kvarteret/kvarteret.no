const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
module.exports = withPlugins([withImages], {
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
    defaultLocale: 'no',
    localeDetection: false,
    domains: [{
      domain: "kvarteret.no",
      defaultLocale: "no"
    }]
  }
});