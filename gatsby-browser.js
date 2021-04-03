/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('typeface-roboto')
// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload()
