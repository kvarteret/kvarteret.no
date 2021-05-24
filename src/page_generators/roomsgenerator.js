const path = require('path')
const { isValidStatus } = require('../helpers/helper')

module.exports.generate = async (createPage, graphql, actions) => {
  // Query pages from Directus
  const response = await graphql(`
    query RoomDataQuery {
      directus {
        room {
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
  `)
  const {
    data: { directus: roomObject },
  } = response
  await Promise.all(
    roomObject.room.map(async (room) => {
      if (!isValidStatus(room.status)) return
      if (!room.page || !isValidStatus(room.page.status)) return
      return Promise.all(
        room.page.translations.map(async (translation) => {
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
            title: translation.title,
            description: translation.description,
            body: translation.content,
            gallery: room.page.gallery,
            facilities: facilities,
          }

          createPage({
            path: '/' + languageModifier + room.page.slug,
            component: path.resolve('./src/templates/room.js'),
            context: dataContext,
          })

          if (urlCode == 'no') {
            createPage({
              path: '/' + room.page.slug,
              component: path.resolve('./src/templates/room.js'),
              context: dataContext,
            })
          }

          createPage({
            path: '/' + languageModifier + 'rooms/' + room.page.slug,
            component: path.resolve('./src/templates/room.js'),
            context: dataContext,
          })
        })
      )
    })
  )
}
