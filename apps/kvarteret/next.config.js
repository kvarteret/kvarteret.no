const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["dak-components"]);
const withImages = require("next-images");
module.exports = withPlugins([withTM(), withImages], {
  images: {
    disableStaticImages: true,
    domains: [
      "cms.kvarteret.no",
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "kvarteret-events.firebasestorage.app",
      "ydkxiragzzsaapnbnebm.supabase.co",
      "jeezqitchepgwxjknwhz.supabase.co",
    ],
  },
  rewrites: async () => [
    {
      source: "/files/:id",
      destination: "https://cms.kvarteret.no/assets/:id",
    },
  ],
  experimental: { images: { layoutRaw: true } },
  reactStrictMode: true,
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false,
    domains: [
      {
        domain: "kvarteret.no",
        defaultLocale: "no",
      },
    ],
  },
  trailingSlash: true,
});
