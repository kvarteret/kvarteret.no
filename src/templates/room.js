import React from 'react'
import { Box, Container, Grid, Hidden } from '@material-ui/core'
import Layout from '../components/shared/layout/layout'
import DAKCarousel from '../components/shared/dakCarousel'
import ExternalContent from '../components/mainSection/externalContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SEO from '../components/seo'

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

const sanitizeGalleryData = (data) =>
  data.map((item) => ({
    img: 'https://cms.kvarteret.no/assets/' + item.directus_files_id.id,
    imageFile: item.directus_files_id.imageFile,
  }))

const RoomFacilities = ({ facilities }) => {
  const justify = facilities?.length > 4 ? 'flex-start' : 'space-between'

  let noteCount = 0
  const facilityElements = facilities.map((facility, id) => (
    <Grid key={id} item container justify="center" xs={12} sm={6} lg={3}>
      {facility.name}: {facility.value}
      {facility.note && '*'.repeat(++noteCount)}
    </Grid>
  ))

  noteCount = 0
  const noteElements = facilities.map(
    (facility, id) =>
      facility.note && (
        <span key={id}>
          {'*'.repeat(++noteCount)} {facility.note}
        </span>
      )
  )

  return (
    <Box>
      <Box mt={2} p={2} style={{ backgroundColor: '#E6E6E6' }}>
        <Grid container direction="row" alignItems="center" justify={justify}>
          {facilityElements}
        </Grid>
      </Box>
      <Box mt={1}>
        <Grid container direction="column">
          {noteElements}
        </Grid>
      </Box>
    </Box>
  )
}

/**
 * General component for showing information about a page
 * @param {Page} pageContext
 */
const Room = ({ pageContext }) => {
  const galleryData = sanitizeGalleryData(pageContext.gallery)
  return (
    <Layout spacingTop={true}>
      <SEO title={pageContext.title} description={pageContext.description} />
      <Container disableGutters>
        <Box m={{ xs: 3, md: 4, lg: 6 }}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={12} md={6}>
              <ExternalContent data={pageContext.body} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={{ xs: 4 }}>
                <DAKCarousel
                  dots={true}
                  arrows={true}
                  items={galleryData}
                ></DAKCarousel>
                {pageContext.facilities?.length > 0 && (
                  <RoomFacilities facilities={pageContext.facilities} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default Room
