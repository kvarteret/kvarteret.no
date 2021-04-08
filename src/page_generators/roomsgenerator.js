const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query RoomDataQuery {
      directus {
        items {
          room {
            gallery {
              directus_files_id {
                id
                title
                description
                imageFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            name
            slug
            status
            translations {
              description
              languages_code {
                url_code
              }
            }
          }
        }
      }
    }
  `)
  const {
    data: {
      directus: { items: roomObject },
    },
  } = response
  await Promise.all(
    roomObject.room.map(async (room) => {
      if (!isValidStatus(room.status)) return

      return Promise.all(
        room.translations.map(async (translation) => {
          let languageModifier = translation.languages_code.url_code + '/'

          const dataContext = {
            body: translation.description,
            gallery: room.gallery,
          }

          createPage({
            path: '/' + languageModifier + 'room/' + room.slug,
            component: path.resolve('./src/templates/page.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
