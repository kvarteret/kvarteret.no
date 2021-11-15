module.exports = {
    siteUrl: process.env.SITE_URL || 'https://kvarteret.no',
    generateRobotsTxt: true, 
    changefreq: "weekly",
    transform: async (config, path) => {
        let priority = config.priority;
        let changeFreq = config.changefreq;
        if(path === "/" || path === "/en" || path === "/no") {
            priority = 1;
            changeFreq = "daily";
        }

        return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: changeFreq,
            priority: priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
          }
    }
  }