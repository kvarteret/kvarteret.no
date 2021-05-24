const { createPage } = require('../helpers/pageGeneratorHelper')

module.exports.generate = async (pageCreator, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query PageItems {
      directus {
        page {
          id
          slug
          status
          translations {
            snippets {
              title
              code
            }
            languages_code {
              url_code
              name
            }
            content
            description
            title
          }
          gallery {
            directus_files_id {
              id
              title
              description
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
    data: { directus: pageObject },
  } = response
  await Promise.all(
    pageObject.page.map(async (PageItems) => {
      createPage(PageItems, pageCreator)
    })
  )
}
