import React from 'react'
import { Box, Grid } from '@material-ui/core'
import Layout from '../components/layout'
import DAKCarousel from '../components/dakCarousel'

/**
 * General component for showing information about a page with it's room
 * @param {Page} dataContext
 */
const Page = ({ pageContext }) => {
  console.log(pageContext)
  return (
    <Layout spacingTop={true}>
      <Box>
        <Grid container direction="row-reverse">
          <Grid item xs={12} md={6}>
            <Box p={{ xs: 0, md: 4 }} pr={{ xs: 0, md: 4, lg: 8 }}>
              <DAKCarousel items={pageContext.gallery}></DAKCarousel>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box m={{ xs: 2, md: 4, lg: 8 }} mt={{ xs: 0, lg: 4 }}>
              <div dangerouslySetInnerHTML={{ __html: pageContext.body }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

/**
 * @typedef Page
 * @prop {string} title
 * @prop {Room} roomInfo
 */

export default Page
