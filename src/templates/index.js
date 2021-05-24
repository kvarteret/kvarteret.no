import React from 'react'

import Layout from '../components/shared/layout/layout'
import MainContent from '../components/mainSection/mainContent'
import { useMediaQuery, useTheme } from '@material-ui/core'
import SEO from '../components/seo'

const IndexPage = ({ pageContext }) => {
  const theme = useTheme()
  const spacingTop =
    pageContext?.gallery?.length == 0 ||
    useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Layout spacingTop={!spacingTop}>
      <SEO />
      <MainContent />
    </Layout>
  )
}

export default IndexPage
