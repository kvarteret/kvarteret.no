const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  const response = await graphql(`
  query MyQuery {
    directus {
      group {
        translations {
          languages_code {
            url_code
            name
          }
          group_id {
            date_updated
            id
            slug
            sort
            status
          }
          snippets
          text
        }
        date_updated
        id
        slug
        sort
        status
        page_gallery {
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
    data: { directus: groupObjects },
  } = response
  await Promise.all(
    groupObjects.group.map(async (groupItem) => {
      if (!isValidStatus(groupItem.status)) return

      return Promise.all(
        groupItem.translations.map(async (translation) => {
          let languageModifier = translation.languages_code.url_code + '/'

          const dataContext = {
            body: translation.text,
            gallery: groupItem.page_gallery,
            snippets: translation.snippets,
          }

          createPage({
            path: '/' + languageModifier + 'group/' + groupItem.slug,
            component: path.resolve('./src/templates/page.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
