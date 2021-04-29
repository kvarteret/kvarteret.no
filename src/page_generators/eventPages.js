const path = require('path')
const { isValidStatus } = require('../helpers/helper')

function getTranslationForCode(translations, urlCode) {
  return translations.filter((x) => x.languages_code.url_code == urlCode)[0]
}

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
          event_end
          event_start
          ticket_url
          facebook_event
          top_gallery {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG)
              }
            }
          }
          snippet {
            snippets_id {
              code
              translations {
                title
                languages_code {
                  url_code
                }
              }
            }
          }
          gallery {
            directus_files_id {
              id
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
  `)
  const {
    data: { directus: eventObj },
  } = response
  await Promise.all(
    eventObj.events.map(async (eventItem) => {
      if (!isValidStatus(eventItem.status)) return

      eventItem.translations.forEach((translation) => {
        let languageModifier = translation.languages_code.url_code + '/'

        const sanitizedSnippet = eventItem.snippet.map((item) => ({
          code: item.snippets_id.code,
          title: getTranslationForCode(
            item.snippets_id.translations,
            translation.languages_code.url_code
          )?.title,
        }))

        const dataContext = {
          title: translation.title,
          body: translation.description,
          image: eventItem.top_gallery.imageFile,
          gallery: eventItem.gallery,
          snippets: sanitizedSnippet,
          ticket_url: eventItem.ticket_url,
          facebook_url: eventItem.facebook_event,
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
