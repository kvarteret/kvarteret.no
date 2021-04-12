const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  const response = await graphql(`
    query GroupItems {
      directus {
        group {
          date_updated
          id
          slug
          sort
          status
          translations {
            group_id {
              date_updated
              id
              slug
              sort
              status
            }
            languages_code {
              name
              url_code
              code
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
            body: translation.description,
            gallery: groupItem.gallery,
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
