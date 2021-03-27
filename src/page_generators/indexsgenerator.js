const path = require('path')

module.exports.generate = async (createPage, graphql, actions) => {
  createPage({
    path: '/no',
    component: path.resolve('./src/pages/index.js'),
  })

  createPage({
    path: '/en',
    component: path.resolve('./src/pages/index.js'),
  })
}
