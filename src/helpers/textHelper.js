import { graphql, useStaticQuery } from 'gatsby'
import { UrlLanguageCode } from './languageHelper'

function getAllTextsDict() {
  const data = useStaticQuery(graphql`
    query TextQuery {
      directus {
        items {
          texts {
            text_id
            translations {
              text
              languages_code {
                url_code
              }
            }
          }
        }
      }
    }
  `)

  const dictionaries = { no: {}, en: {} }
  data.directus.items.texts.forEach((text) => {
    text.translations.forEach((translation) => {
      const languageCode = translation.languages_code.url_code
      dictionaries[languageCode][text.text_id] = translation.text
    })
  })

  return dictionaries
}

export function getTranslatedText(id) {
  const textDictionary = getAllTextsDict()
  const languageCode = UrlLanguageCode()
  if (!id in textDictionary[languageCode]) return null
  return textDictionary[languageCode][id]
}
