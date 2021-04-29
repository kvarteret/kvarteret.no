import React from 'react'
import {
  Grid,
  Typography,
  Box,
  Link,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import DAKCarousel from './shared/dakCarousel'
import TopGalleryCarouselItem from './shared/TopGalleryCarouselItem'
import ExternalContent from './mainSection/externalContent'
import { withStyles } from '@material-ui/styles'
import { Snippets } from './shared/snippets'

const OverviewItem = ({ label, value }) => {
  return (
    <Grid container direction="row" spacing="space-between" spacing={4}>
      <Grid item xs={6}>
        {label}
      </Grid>
      <Grid item xs={6}>
        {value}
      </Grid>
    </Grid>
  )
}

const exampleOverviewItems = [
  { label: 'Sted', value: 'Teglverket' },
  { label: 'Arrangør', value: 'Studentersamfunnet i Bergen' },
  { label: 'Dato', value: '4. Mai 2021' },
  { label: 'Tid', value: '18:00 - 21:00' },
  { label: 'Pris', value: '57,-' },
  { label: 'Aldersgrense', value: '20 år, 18 år med studentbevis' },
]

const getImageFromData = (data) => [
  {
    imageFile: data.image,
    text: data.title,
  },
]

const sanitizeGalleryData = (data) =>
  data.map((item) => ({
    imageFile: item.directus_files_id.imageFile,
  }))

const Snippet = ({ item }) => (
  <div>
    <h2>{item.title}</h2> <DangerouslySetHtmlContent html={item.code} />
  </div>
)

//   data.directus.general_information.carousel_items.map((item) => ({
//     img: getFullImageUrl(item.image.id),
//     imageFile: item.image.imageFile,
//     text: getTranslation(item.translations)?.title,
//   }))

const customCarouselComponent = (props) => (
  <TopGalleryCarouselItem {...props} styleImgText={{ bottom: 51 }} />
)

export default function EventPage({ dataContext }) {
  const overviewItems = exampleOverviewItems.map((item, i) => (
    <OverviewItem key={i} {...item} />
  ))
  const galleryData = sanitizeGalleryData(dataContext.gallery)

  const theme = useTheme()
  const spacingTop =
    dataContext?.gallery?.length == 0 ||
    useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <DAKCarousel
          animationSpeed={1000}
          items={getImageFromData(dataContext)}
          template={customCarouselComponent}
          marginBottom={51}
        ></DAKCarousel>
      </Grid>
      <Grid item xs={12} style={{ position: 'relative', top: -30 }}>
        <Box mx={{ xs: 2, md: 4 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid
              item
              style={{ flexGrow: 0, maxWidth: '48%', flexBasis: '48%' }}
              container
              alignItems="center"
              justify="center"
            >
              {dataContext.ticket_url && (
                <a
                  href={dataContext.ticket_url}
                  target="_blank"
                  style={{
                    width: '100%',
                    height: 50,
                    fontSize: 18,
                    color: 'white',
                    backgroundColor: '#f54b4b',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>Kjøp billetter</div>
                </a>
              )}
            </Grid>
            <Grid
              item
              style={{ flexGrow: 0, maxWidth: '48%', flexBasis: '48%' }}
              container
              alignItems="center"
              justify="center"
            >
              {dataContext.facebook_url && (
                <a
                  href={dataContext.facebook_url}
                  target="_blank"
                  style={{
                    width: '100%',
                    height: 50,
                    fontSize: 18,
                    color: 'white',
                    backgroundColor: '#f54b4b',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>Facebook Event</div>
                </a>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={{ xs: 1 }} m={{ xs: 2, md: 4 }}>
          <Grid container direction="row">
            <Grid item container xs={12} md={6} direction="column">
              <Grid item>
                <Box mb={2}>
                  <Typography color="primary" variant="h2">
                    Oversikt
                  </Typography>
                </Box>
                {overviewItems}
              </Grid>
              <Grid item>
                <ExternalContent data={dataContext.body}></ExternalContent>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              direction="column"
              alignItems="center"
            >
              <Grid item xs={12} xl={8}>
                <Box mx={{ xs: 0, md: 6 }} mt={2}>
                  {galleryData.length > 0 && (
                    <DAKCarousel
                      dots={true}
                      arrows={spacingTop}
                      items={galleryData}
                    ></DAKCarousel>
                  )}
                  <Box mt={4}>
                    <Snippets items={dataContext.snippets} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
