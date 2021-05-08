import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import EventSection from './eventSection'

import NewsSection from './newsSection'
import TodaySection from './todaySection'
import './mainContent.scss'
import Tider from '../shared/tider'
import DAKCarousel from '../shared/dakCarousel'
import { getFullImageUrl } from '../../helpers/fileHelper'
import { graphql, useStaticQuery } from 'gatsby'
import { getTranslation } from '../../helpers/languageHelper'
import TopGalleryCarouselItem from '../shared/TopGalleryCarouselItem'
import { getCarouselLink } from '../../helpers/navHelper'

const useStyles = makeStyles({
  root: {
    marginBottom: 60,
  },
  img: {
    height: '480px',
    width: '100%',
    objectFit: 'cover',
  },
  content: {
    margin: '0 3%',
    marginTop: '20px',
  },
  imgContainer: {
    position: 'relative',
  },
  imgText: {
    position: 'absolute',
    bottom: '30px',
    transform: 'translateZ(0)',
    left: '3%',
    color: 'white',
    fontSize: 30,
    borderRadius: '25%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    boxShadow: '0 0 50px 50px rgba(0,0,0,0.25)',
    '@media (min-width:600px)': {
      fontSize: 50,
    },
    '@media (min-width:960px)': {
      fontSize: 80,
    },
  },
  imgTextDark: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    boxShadow: '0 0 50px 50px rgba(255,255,255,0.25)',
  },
  carousel: {
    position: 'relative',
  },
})

const sanitizeData = (data) =>
  data.directus.general_information.carousel_items.map((item) => ({
    img: getFullImageUrl(item.image.id),
    imageFile: item.image.imageFile,
    text: getTranslation(item.translations)?.title,
    link: getCarouselLink(item.destination[0]),
  }))

const MainContent = ({ content }) => {
  const classes = useStyles()
  const data = sanitizeData(
    useStaticQuery(graphql`
      query CarouselData {
        directus {
          general_information {
            carousel_items {
              image {
                id
                imageFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: PNG)
                  }
                }
              }
              translations {
                title
                languages_code {
                  url_code
                }
              }
              destination {
                item {
                  ... on DirectusCMS_room {
                    id
                    name
                    status
                    translations {
                      languages_code {
                        url_code
                      }
                    }
                    slug
                  }
                  ... on DirectusCMS_page {
                    id
                    status
                    slug
                    translations {
                      languages_code {
                        url_code
                      }
                      name
                    }
                  }
                  ... on DirectusCMS_news {
                    id
                    status
                    slug
                    translations {
                      title
                      languages_code {
                        url_code
                      }
                    }
                  }
                  ... on DirectusCMS_link {
                    id
                    status
                    url
                    translations {
                      name
                      languages_code {
                        url_code
                      }
                    }
                  }
                  ... on DirectusCMS_group {
                    id
                    status
                    slug
                    translations {
                      languages_code {
                        url_code
                      }
                    }
                  }
                  ... on DirectusCMS_events {
                    id
                    status
                    slug
                    translations {
                      title
                      languages_code {
                        url_code
                      }
                    }
                  }
                }
                collection
                id
              }
            }
          }
        }
      }
    `)
  )
  if (data.length == 0) {
    data.push({
      img: getFullImageUrl('7ddddb91-846a-4da9-b4fd-c2d0a5ba9cd2'),
    })
  }

  return (
    <div>
      <Grid container direction="column" className={classes.root}>
        <Grid item xs={12} className={classes.imgContainer}>
          <DAKCarousel
            animationSpeed={1000}
            items={data}
            template={TopGalleryCarouselItem}
          ></DAKCarousel>
        </Grid>
        <Grid item className={classes.content}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6} lg={8} xl={9}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={8}>
                  <TodaySection />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                  <Tider />
                </Grid>
                <Grid item xs={12}>
                  <EventSection />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6} lg={4} xl={3}>
              <NewsSection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default MainContent
