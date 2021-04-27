import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import EventCard from './card'

import './mainContent.scss'
import { getTranslatedText } from '../../helpers/textHelper'
import { getFullImageUrl } from '../../helpers/fileHelper'
import moment from 'moment'
import { getTranslatedUrl, getTranslation } from '../../helpers/languageHelper'
import { isValidStatus } from '../../helpers/helper'

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

const EventSection = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query IndexPageData {
      directus {
        events {
          id
          status
          slug
          translations {
            languages_code {
              url_code
            }
            title
            tagline
          }
          event_end
          event_start
          ticket_url
          top_gallery {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 285)
              }
            }
          }
          rooms {
            room_id {
              name
            }
          }
        }
      }
    }
  `)
  let eventItems = data.directus.events
  eventItems.sort((x, y) => new Date(x.event_start) - new Date(y.event_start))
  eventItems = eventItems
    .filter(
      (x) => isValidStatus(x.status) && new Date(x.event_end) - new Date() > 0
    )
    .map((x) => {
      const start = moment(x.event_start).format('DD. MMM')
      const translation = getTranslation(x.translations)
      let primaryRoom = null
      if (x.rooms.length > 0) {
        primaryRoom = x.rooms[0].room_id.name
      }
      return (
        <Grid item xs={12} sm={6} md={12} lg={6} xl={3} key={x.id}>
          <EventCard
            imgSrc={x.top_gallery.imageFile}
            alt="Card image"
            date={start}
            title={translation.title}
            text={translation.tagline}
            url={getTranslatedUrl('events/' + x.slug)}
            ticketUrl={x.ticket_url}
            room={primaryRoom}
          />
        </Grid>
      )
    })

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid
          container
          justify="space-between"
          alignItems="flex-end"
          className={classes.title}
        >
          <Typography color="primary" variant="h2">
            {getTranslatedText('what-is-happening')}
          </Typography>
          <Typography>{getTranslatedText('all-events')}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Divider
          orientation="horizontal"
          flexItem
          variant="fullWidth"
          className={classes.divider}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="stretch"
          spacing={3}
          className={classes.mainContent}
        >
          {eventItems}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EventSection
