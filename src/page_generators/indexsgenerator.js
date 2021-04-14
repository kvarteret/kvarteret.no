const path = require('path')

module.exports.generate = async (createPage, graphql, actions) => {
  createPage({
    path: '/no',
    component: path.resolve('./src/templates/index.js'),
    context: {},
  })

  createPage({
    path: '/en',
    component: path.resolve('./src/templates/index.js'),
    context: {},
  })
  createPage({
    path: '/',
    component: path.resolve('./src/templates/index.js'),
    context: {},
  })
}
