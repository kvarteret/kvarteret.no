import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import moment from 'moment'
import React from 'react'
import { isValidStatus } from '../../helpers/helper'
import { getTranslation } from '../../helpers/languageHelper'
import { getTranslatedText } from '../../helpers/textHelper'
import EventCard from './card'
import EventSection from './eventSection'

import './mainContent.scss'

const useStyles = makeStyles({
  title: {
    marginBottom: 8,
  },
  mainContent: {
    backgroundColor: '#F6F6F6',
    margin: 0,
  },
  divider: {
    backgroundColor: 'red',
    height: 2,
    marginBottom: 8,
  },
})

const sanitizeData = (data) => {
  const roomEvents = []
  data.directus.events.forEach((event) => {
    if (!isValidStatus(event.status)) return
    const translation = getTranslation(event.translations)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (new Date(event.event_end) - today < 0) return
    today.setHours(23, 59, 59, 59)
    if (new Date(event.event_start) - today > 0) return

    let startTime = moment(event.event_start).format('HH:mm')
    let endTime = moment(event.event_end).format('HH:mm')

    event.rooms.forEach((room) => {
      roomEvents.push({
        eventid: event.id,
        floor: room.room_id.floor,
        timespan: startTime + ' - ' + endTime,
        title: translation.title,
        room: room.room_id.name,
      })
    })
  })
  return roomEvents
}

const TodaySection = () => {
  const classes = useStyles()

  const newData = useStaticQuery(graphql`
    query TodaySectionData {
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
          }
          event_end
          event_start
          rooms {
            room_id {
              name
              floor
            }
          }
        }
      }
    }
  `)

  const data = sanitizeData(newData)
  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  const eventsByFloor = groupBy(data, 'floor')
  const components = []
  for (let i = 3; i >= 1; --i) {
    let floorData = eventsByFloor[i]
    if (floorData) {
      components.push(
        <Grid item key={i}>
          <Grid container>
            <Typography>
              {i}. {getTranslatedText('floor')}
            </Typography>
            {/* TODO: Make component function */}
            {floorData.map((x) => (
              <Grid container direction="row" key={x.eventid}>
                <Grid item xs={4}>
                  {x.timespan}
                </Grid>
                <Grid item xs={4}>
                  {x.title}
                </Grid>
                <Grid item xs={4}>
                  {x.room}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography color="primary" variant="h3">
          {getTranslatedText('happening-today')}
        </Typography>
      </Grid>

      {components}
    </Grid>
  )
}

export default TodaySection
