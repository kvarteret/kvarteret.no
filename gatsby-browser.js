/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('typeface-roboto')

require('./src/fonts/fonts.css')

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload()

// gatsby-browser.js
import ReactDOM from 'react-dom'

// this is a hack to fix missing styles on refresh in production
// reference: https://github.com/gatsbyjs/gatsby/issues/17676#issuecomment-535796737
export function replaceHydrateFunction() {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
