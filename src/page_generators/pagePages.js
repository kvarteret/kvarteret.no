const path = require('path');

module.exports.generate = async (createPage, graphql, actions) => {

    // Query pages from Directus
    const response = await graphql(`
    query PageItems {
        directus {
          items {
            page {
              id
              slug
              status
              translations {
                text
                languages_code {
                  url_code
                  name
                }
              }
            }
          }
        }
      }  
    `);

    const { data: { directus: { items: pageObject } } } = response;
    await Promise.all(pageObject.news.map(async PageItems => {
        if (PageItems.status !== "published") return;

        PageItems.translations.forEach(translation => {
            let languageModifier = translation.languages_code.url_code + "/";

            const dataContext = {
                body: translation.text,
            };

            createPage({
                path: "/" + languageModifier + "page/" + pageItems.slug,
                component: path.resolve("./src/pages/page.js"),
                context: dataContext
            });
        })
    }));
}