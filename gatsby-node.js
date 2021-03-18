/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

var glob = require( 'glob' )
  , path = require( 'path' );

  const generators = [];
glob.sync( './page_generators/**/*.js' ).forEach( function( file ) {
  const generator = require( path.resolve( file ) );
  generators.push(generator);
});

module.exports.createPages = async({graphql, actions}) => {
    const {createPage} = actions;
  
    await Promise.all(generators.map(async generator => {
      await generator.generate(createPage, graphql, actions);
    }))
}