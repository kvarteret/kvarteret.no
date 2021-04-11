const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query NewsItems {
      directus {
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
  `)

  const {
    data: { directus: newsObject },
  } = response
  await Promise.all(
    newsObject.news.map(async (newsItem) => {
      if (!isValidStatus(newsItem.status)) return

      return Promise.all(
        newsItem.translations.map(async (translation) => {
          let languageModifier = translation.languages_code.url_code + '/'

          const dataContext = {
            title: translation.title,
            body: translation.description,
          }

          createPage({
            path: '/' + languageModifier + 'news/' + newsItem.slug,
            component: path.resolve('./src/templates/news.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
