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
          id
          status
          event_start
          event_end
          facebook_url
          ticket_url
          top_image {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG)
              }
            }
          }
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
                    gatsbyImageData(placeholder: BLURRED, formats: PNG)
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
    data: { directus: eventObj },
  } = response
  await Promise.all(
    eventObj.events.map(async (eventItem) => {
      if (!isValidStatus(eventItem.status)) return
      if (!eventItem.page || !isValidStatus(eventItem.page.status)) return

      eventItem.page.translations.forEach((translation) => {
        let languageModifier = translation.languages_code.url_code + '/'

        const sanitizedSnippet = translation.snippets.map((item) => ({
          code: item.snippets_id.code,
          title: getTranslationForCode(
            item.snippets_id.translations,
            translation.languages_code.url_code
          )?.title,
        }))

        const dataContext = {
          title: translation.title,
          body: translation.content,
          image: eventItem.top_image.imageFile,
          gallery: eventItem.page.gallery,
          snippets: sanitizedSnippet,
          ticket_url: eventItem.ticket_url,
          facebook_url: eventItem.facebook_url,
        }

        createPage({
          path: '/' + languageModifier + 'events/' + eventItem.page.slug,
          component: path.resolve('./src/templates/event.js'),
          context: dataContext,
        })

        createPage({
          path: '/' + languageModifier + eventItem.page.slug,
          component: path.resolve('./src/templates/event.js'),
          context: dataContext,
        })
      })
    })
  )
}
