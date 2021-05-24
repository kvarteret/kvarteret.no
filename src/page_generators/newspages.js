const path = require('path')
const { isValidStatus } = require('../helpers/helper')
const { createPage } = require('../helpers/pageGeneratorHelper')

module.exports.generate = async (pageCreator, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query NewsItems {
      directus {
        news {
          status
          destination {
            item {
              ... on DirectusCMS_page {
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
        newsItem.destination.map(async (page) => {
          createPage(page.item, pageCreator, ['news'])
        })
      )
    })
  )
}
