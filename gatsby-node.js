/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

var glob = require('glob'),
  path = require('path')
require('dotenv').config()

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

var { Directus } = require('@directus/sdk')

const generators = []
glob.sync('./src/page_generators/**/*.js').forEach(function (file) {
  const generator = require(path.resolve(file))
  if (!generator || !generator.generate) return
  generators.push(generator)
})

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const bliFrivillig = process.env.BLIFRIVILLIG !== undefined
  if (bliFrivillig) return

  await Promise.all(
    generators.map(async (generator) => {
      const newCreatePage = async (data) => {
        // console.log(`Created page ${data.path} with data: `, JSON.stringify(data.context));
        await createPage(data)
      }
      await generator.generate(newCreatePage, graphql, actions)
    })
  )
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
}) => {
  const { createNode } = actions

  const directus = new Directus('https://cms.kvarteret.no/')
  const files = await directus.files.readMany()

  const createImageObject = async (imageData) => {
    const fileNode = await createRemoteFileNode({
      url: `https://cms.kvarteret.no/assets/${imageData.id}`,
      store,
      cache,
      createNode,
      createNodeId,
    })

    const nodeData = {
      ...imageData,
      imageId: imageData.id,
    }

    if (fileNode) {
      console.log('Downloaded asset ', imageData.title)
      nodeData.localFile___NODE = fileNode.id
    }

    return Object.assign({}, nodeData, {
      id: createNodeId(`directus-image-${nodeData.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'DirectusImage',
        mediaType: nodeData.type,
        content: JSON.stringify(nodeData),
        contentDigest: createContentDigest(nodeData),
      },
    })
  }

  await Promise.all(
    files.data.map(async (image) => {
      const node = await createImageObject(image)
      createNode(node)
    })
  )
}

exports.createResolvers = async ({ createResolvers }) => {
  createResolvers({
    DirectusCMS_directus_files: {
      imageFile: {
        type: 'File',
        resolve: (source, args, context, info) => {
          const directusImageNode = context.nodeModel
            .getAllNodes({ type: 'DirectusImage' })
            .find((image) => image.imageId == source.id)
          const fileNode = context.nodeModel.getNodeById({
            id: directusImageNode.localFile___NODE,
            type: 'File',
          })
          if (fileNode) return fileNode
        },
      },
    },
  })
}

module.exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions // renamed to `actions` in Gatsby v2
  const bliFrivillig = process.env.BLIFRIVILLIG !== undefined
  if (
    bliFrivillig &&
    !/404/.test(page.path) &&
    page.path !== '/blifrivillig/'
  ) {
    deletePage(page)
  }

  if (page.path == '/blifrivillig/') {
    deletePage(page)
    console.log('PAGE', page)
    createPage({
      path: '/',
      component: page.component,
      context: page.context,
    })
  }
}

// module.exports.onPostBuild = () => {

// }
