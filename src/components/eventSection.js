import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import EventCard from './card'

import './mainContent.scss'

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
        items {
          events {
            id
            status
            slug
            translations {
              description
              languages_code {
                code
                name
              }
              title
            }
          }
        }
      }
    }
  `)
  const eventItems = data.directus.items.events
    .filter((x) => x.status == 'published')
    .map((x) => (
      <Grid item xs={12} sm={6} md={12} lg={6} xl={3} key={x.id}>
        <EventCard
          imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png"
          alt="Card image"
          date="3. NOVEMBER | TEGLVERKET | DEBATT"
          title={x.translations[0].title}
          text={x.translations[0].description}
          url={'/events/' + x.slug}
        />
      </Grid>
    ))

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
            Aktuelt
          </Typography>
          <Typography>Alle arrangementer</Typography>
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
        <Grid container spacing={3} className={classes.mainContent}>
          {eventItems}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EventSection
