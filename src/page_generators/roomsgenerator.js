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
                    gatsbyImageData(placeholder: BLURRED, formats: PNG)
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
            facilities {
              translations {
                languages_code {
                  url_code
                }
                name
                value
                note
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
          const urlCode = translation.languages_code.url_code
          let languageModifier = urlCode + '/'

          const facilities = room.facilities.map((facility) => {
            const translation = facility.translations.filter(
              (x) => x.languages_code.url_code == urlCode
            )[0]
            return {
              ...translation,
            }
          })

          const dataContext = {
            body: translation.description,
            gallery: room.gallery,
            facilities: facilities,
          }

          createPage({
            path: '/' + languageModifier + 'room/' + room.slug,
            component: path.resolve('./src/templates/room.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
