import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import NewsCard from './newsCard'

import './mainContent.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { getTranslatedText } from '../../helpers/textHelper'
import { getTranslatedUrl, getTranslation } from '../../helpers/languageHelper'
import { isValidStatus } from '../../helpers/helper'
import { getCarouselLink } from '../../helpers/navHelper'

const useStyles = makeStyles({
  title: {
    marginBottom: 8,
  },
  mainContent: {
    backgroundColor: '#F6F6F6',
    margin: 0,
    maxWidth: '100%',
  },
  divider: {
    backgroundColor: 'red',
    height: 2,
    marginBottom: 8,
  },
})

const NewsSection = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query NewsSectionQuery {
      directus {
        news {
          date_created
          date_updated
          id
          status
          thumbnail {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: PNG
                  layout: FIXED
                  width: 66
                  height: 66
                )
              }
            }
          }
          translations {
            languages_code {
              url_code
            }
            tagline
            title
          }
          destination {
            collection
            item {
              ... on DirectusCMS_link {
                url
              }
              ... on DirectusCMS_page {
                slug
                status
              }
            }
          }
        }
      }
    }
  `)
  const newsItems = data.directus.news
    .filter((x) => isValidStatus(x.status))
    .map((x) => {
      const translation = getTranslation(x.translations)
      const destination = x.destination
      const url = getCarouselLink(destination[0])
      return (
        <Grid item xs={12} key={x.id}>
          <NewsCard
            imgSrc={x?.thumbnail?.imageFile}
            alt={x.title}
            date={x.date_updated || x.date_created}
            title={translation.title}
            text={translation.tagline}
            url={url}
          />
        </Grid>
      )
    })

  return (
    <Grid container direction="column">
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
        className={classes.title}
      >
        <Typography color="primary" variant="h2">
          {getTranslatedText('news')}
        </Typography>
        <Typography>{getTranslatedText('more-news')}</Typography>
      </Grid>
      <Divider
        orientation="horizontal"
        flexItem
        variant="fullWidth"
        className={classes.divider}
      />
      <Grid item xs={12}>
        <Grid container spacing={2} className={classes.mainContent}>
          {newsItems}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewsSection
