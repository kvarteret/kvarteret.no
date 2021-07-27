const path = require('path')

require('dotenv').config()

module.exports.generate = async (createPage, graphql, actions) => {
  const bliFrivillig = process.env.BLIFRIVILLIG !== undefined

  if (bliFrivillig) {
    createPage({
      path: '/',
      component: path.resolve('./src/templates/blifrivillig.js'),
      context: { isBliFrivillig: bliFrivillig },
    })
    createPage({
      path: '/no',
      component: path.resolve('./src/templates/blifrivillig.js'),
      context: { isBliFrivillig: bliFrivillig },
    })

    createPage({
      path: '/en',
      component: path.resolve('./src/templates/blifrivillig.js'),
      context: { isBliFrivillig: bliFrivillig },
    })
    return
  }
  createPage({
    path: '/no/blifrivillig',
    component: path.resolve('./src/templates/blifrivillig.js'),
    context: { isBliFrivillig: false },
  })

  createPage({
    path: '/en/blifrivillig',
    component: path.resolve('./src/templates/blifrivillig.js'),
    context: { isBliFrivillig: false },
  })
  createPage({
    path: '/blifrivillig',
    component: path.resolve('./src/templates/blifrivillig.js'),
    context: { isBliFrivillig: false },
  })
}
