/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

var glob = require('glob')
  , path = require('path');

const generators = [];
glob.sync('./src/page_generators/**/*.js').forEach(function (file) {
  const generator = require(path.resolve(file));
  if (!generator || !generator.generate) return;
  generators.push(generator);
});

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await Promise.all(generators.map(async generator => {
    const newCreatePage = async (data) => {
      console.log(`Created page ${data.path} with data: `, JSON.stringify(data.context));
      await createPage(data);
    };
    await generator.generate(newCreatePage, graphql, actions);
  }))
}