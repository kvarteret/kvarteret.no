const path = require('path');

module.exports.generate = async (createPage, graphql, actions) => {

    // Query pages from Directus
    const response = await graphql(`
    query NewsItems {
        directus {
          items {
            news {
              date_created
              date_updated
              id
              slug
              status
              translations {
                title
                description
                languages_code {
                  code
                  name
                  url_code
                }
              }
            }
          }
        }
      }
      
    `);

    const { data: { directus: { items: newsObject } } } = response;
    await Promise.all(newsObject.news.map(async newsItem => {
        if (newsItem.status !== "published") return;

        newsItem.translations.forEach(translation => {
            let languageModifier = translation.languages_code.url_code + "/";

            const dataContext = {
                title: translation.title,
                body: translation.description,
            };


            createPage({
                path: "/" + languageModifier + "news/" + newsItem.slug,
                component: path.resolve("./src/pages/page.js"),
                context: dataContext
            });
        })
    }));
}