import React from 'react'
import { Box, Grid, Hidden } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Layout from '../components/shared/layout/layout'
import DAKCarousel from '../components/shared/dakCarousel'
import ExternalContent from '../components/mainSection/externalContent'
import DangerouslySetHtmlContent from '../components/shared/DangerousSetHtmlContent'
import { Snippets } from '../components/shared/snippets'

const sanitizeGalleryData = (data) =>
  data?.map((item) => ({
    img: 'https://cms.kvarteret.no/assets/' + item.directus_files_id.id,
    imageFile: item.directus_files_id.imageFile,
  })) || []

/**
 * General component for showing information about a page
 * @param {Page} pageContext
 */
const Page = ({ pageContext }) => {
  const snippets = (pageContext.snippets && (
    <Box m={{ xs: 2, md: 4, lg: 8 }} mt={{ xs: 0, lg: 4 }}>
      <Snippets
        items={pageContext.snippets.map((item) => ({
          title: item.title,
          code: item.snippet,
        }))}
      />
    </Box>
  )) || <div></div>

  const theme = useTheme()
  const spacingTop =
    pageContext?.gallery?.length == 0 ||
    useMediaQuery(theme.breakpoints.up('md'))

  const galleryData = sanitizeGalleryData(pageContext.gallery)

  return (
    <Layout spacingTop={spacingTop}>
      <Box>
        <Grid container direction="row-reverse">
          <Grid item xs={12} md={6}>
            {galleryData.length > 0 && (
              <Box
                p={{ xs: 0, md: 4 }}
                pr={{ xs: 0, md: 4, lg: 6 }}
                mb={{ xs: 4, md: 4 }}
              >
                <DAKCarousel
                  dots={true}
                  arrows={spacingTop}
                  items={galleryData}
                ></DAKCarousel>
              </Box>
            )}
            <Hidden smDown>{snippets}</Hidden>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              m={{ xs: 2, md: 4, lg: 6 }}
              mt={{ xs: 0, lg: 4 }}
              mb={{ xs: 8 }}
            >
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
