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
              url_code
            }
          }
          gallery {
            directus_files_id {
              id
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: PNG
                    aspectRatio: 1.8
                    width: 1080
                  )
                }
              }
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
            body: translation.description,
            gallery: newsItem.gallery,
          }

          createPage({
            path: '/' + languageModifier + 'news/' + newsItem.slug,
            component: path.resolve('./src/templates/page.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
