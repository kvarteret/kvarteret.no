const path = require('path')
const { isValidStatus } = require('./helper')

module.exports.createPage = function (page, pageCreator, additionalSlugs) {
  if (!isValidStatus(page.status)) return

  return Promise.all(
    page.translations.map(async (translation) => {
      let languageModifier = translation.languages_code.url_code + '/'

      const dataContext = {
        body: translation.content,
        gallery: page.gallery,
        snippets: translation.snippets,
      }

      const createObj = (slug) => ({
        path: '/' + languageModifier + slug + page.slug,
        component: path.resolve('./src/templates/page.js'),
        context: dataContext,
      })

      pageCreator(createObj(''))

      for (let slug of additionalSlugs ?? []) {
        pageCreator(createObj(`${slug}/`))
      }
    })
  )
}
