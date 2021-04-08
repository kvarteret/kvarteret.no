const path = require('path')
const { isValidStatus } = require('../helpers/helper')

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
              snippets
              languages_code {
                url_code
                name
              }
            }
            gallery {
              directus_files_id {
                id
                title
                description
                imageFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: PNG)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const {
    data: {
      directus: { items: pageObject },
    },
  } = response
  await Promise.all(
    pageObject.page.map(async (PageItems) => {
      if (!isValidStatus(PageItems.status)) return

      return Promise.all(
        PageItems.translations.map(async (translation) => {
          let languageModifier = translation.languages_code.url_code + '/'

          const dataContext = {
            body: translation.text,
            gallery: PageItems.gallery,
            snippets: translation.snippets,
          }

          createPage({
            path: '/' + languageModifier + 'page/' + PageItems.slug,
            component: path.resolve('./src/templates/page.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
