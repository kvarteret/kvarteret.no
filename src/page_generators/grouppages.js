const path = require('path')
const { isValidStatus } = require('../helpers/helper')
const { createPage } = require('../helpers/pageGeneratorHelper')

module.exports.generate = async (pageCreator, graphql, actions) => {
  const response = await graphql(`
    query MyQuery {
      directus {
        group {
          status
          page {
            id
            status
            slug
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
    }
  `)

  const {
    data: { directus: groupObjects },
  } = response
  await Promise.all(
    groupObjects.group.map(async (groupItem) => {
      if (!isValidStatus(groupItem.status)) return
      if (!groupItem.page) return
      createPage(groupItem.page, pageCreator, ['group'])
    })
  )
}
