import React from 'react'
import { Box, Grid, Hidden } from '@material-ui/core'
import Layout from '../components/layout'
import DAKCarousel from '../components/dakCarousel'
import ExternalContent from '../components/externalContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const Snippet = ({ title, body }) => (
  <div>
    <h3>{title}</h3> <div dangerouslySetInnerHTML={{ __html: body }}></div>
  </div>
)

const Snippets = ({ items }) => {
  const snippets = items.map((item, id) => (
    <Snippet key={id} title={item.title} body={item.snippet} />
  ))

  return <div>{snippets}</div>
}

/**
 * General component for showing information about a page
 * @param {Page} pageContext
 */
const Page = ({ pageContext }) => {
  const snippets = pageContext.snippets && (
    <Box m={{ xs: 2, md: 4, lg: 8 }} mt={{ xs: 0, lg: 4 }}>
      <Snippets items={pageContext.snippets} />
    </Box>
  )

  const theme = useTheme()
  const spacingTop =
    pageContext.gallery.length == 0 || useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Layout spacingTop={spacingTop}>
      <Box>
        <Grid container direction="row-reverse">
          <Grid item xs={12} md={6}>
            {pageContext.gallery.length > 0 && (
              <Box p={{ xs: 0, md: 4 }} pr={{ xs: 0, md: 4, lg: 8 }}>
                <DAKCarousel items={pageContext.gallery}></DAKCarousel>
              </Box>
            )}
            <Hidden smDown>{snippets}</Hidden>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box m={{ xs: 2, md: 4, lg: 8 }} mt={{ xs: 0, lg: 4 }}>
              <ExternalContent data={pageContext.body} />
            </Box>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12} md={6}>
              {snippets}
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Page
