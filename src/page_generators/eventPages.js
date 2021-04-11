const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query eventItems {
      directus {
        events {
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
    data: { directus: eventObj },
  } = response
  await Promise.all(
    eventObj.events.map(async (eventItem) => {
      if (!isValidStatus(eventItem.status)) return

      eventItem.translations.forEach((translation) => {
        let languageModifier = translation.languages_code.url_code + '/'

        const dataContext = {
          title: translation.title,
          body: translation.description,
        }

        createPage({
          path: '/' + languageModifier + 'events/' + eventItem.slug,
          component: path.resolve('./src/templates/event.js'),
          context: dataContext,
        })
      })
    })
  )
}
