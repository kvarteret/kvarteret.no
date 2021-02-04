/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

module.exports.createPages = async({graphql, actions}) => {
    const {createPage} = actions;

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

    const {data: {directus: {items: newsObject}}} = response;
    newsObject.news.forEach(newsItem => {
        if(newsItem.status !== "published") return;

        newsItem.translations.forEach(translation => {
            let languageModifier = translation.languages_code.url_code + "/";

            const dataContext = {
                title: translation.title,
                body: translation.description,
            };

            console.log(`Created page ${"/" + languageModifier + "news/" + newsItem.slug} with dataContext`, dataContext);

            createPage({
                path: "/" + languageModifier + "news/" + newsItem.slug,
                component: path.resolve("./src/templates/page.js"),
                context: dataContext
            });
        })
    });

    // edges.forEach(({node}) => {
    //     if(node.status !== `published`) return;

    //     node.translations.forEach((translation) => {
    //         if(translation.language.toLowerCase() === "no") {
    //             createPage({
    //                 path: "/" + node.slug,
    //                 component: path.resolve('./src/templates/page.jsx'),
    //                 context: {status: node.status, slug: node.slug, ...translation}
    //             });
    //         }
    //         createPage({
    //             path: "/" + translation.language +"/" + node.slug,
    //             component: path.resolve('./src/templates/page.jsx'),
    //             context: {status: node.status, slug: node.slug, ...translation}
    //         });
    //     })

    // });
}