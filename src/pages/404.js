import React from 'react'

import Layout from '../components/shared/layout/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 style={{ paddingTop: '100px', paddingLeft: '40px' }}>NOT FOUND</h1>
    <p style={{ paddingLeft: '40px' }}>
      You just hit a route that doesn&#39;t exist... the sadness.
    </p>
  </Layout>
)

export default NotFoundPage
