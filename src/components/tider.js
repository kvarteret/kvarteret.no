import PropTypes from 'prop-types'
import React from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'

import './footer.scss'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import { getTranslatedText } from '../helpers/textHelper'

const useStyles = makeStyles({
  title: {
    marginBottom: 8,
  },
  divider: {
    marginBottom: 8,
  },
})

const extractData = (data) => {
  let dates = {}
  var openingTimes = data.directus.items.opening_time
  openingTimes.forEach((item) => {
    let times = []
    item.opening_times.forEach((timeobj) => {
      var time = timeobj.opening_time_day_id
      times.push({
        openingTime: time.opening_time,
        closingTime: time.closing_time,
        roomName: time.room.name,
        open: true,
      })
    })
    dates[item.day] = times
  })
  return dates
}

const dateLookup = [
  'søndag',
  'mandag',
  'tirsdag',
  'onsdag',
  'torsdag',
  'fredag',
  'lørdag',
]

const currentDay = () => dateLookup[new Date().getDay()]

const RoomTime = ({ classes, time }) => {
  let timeStr = getTranslatedText('closed')
  if (time.openingTime && time.closingTime && time.open) {
    const opening = moment(time.openingTime, 'HH:mm:ss').format('HH:mm')
    const closing = moment(time.closingTime, 'HH:mm:ss').format('HH:mm')
    timeStr = opening + ' - ' + closing
  }

  return (
    <Grid
      item
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6" color="textSecondary" className={classes.text}>
          {time.roomName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          color="textPrimary"
          className={classes.textTitle}
        >
          {timeStr}
        </Typography>
      </Grid>
    </Grid>
  )
}

const Tider = ({ siteTitle, isFooter }) => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query OpeningTimeQuery {
      directus {
        items {
          opening_time {
            day
            opening_times {
              opening_time_day_id {
                opening_time
                closing_time
                room {
                  name
                }
              }
            }
          }
        }
      }
    }
  `)

  var date = extractData(data)[currentDay()]
  const dateComponents = date.map((time, index) => (
    <RoomTime key={index} time={time} classes={classes}></RoomTime>
  ))
  return (
    <Box>
      <Typography color="primary" variant="h3" className={classes.title}>
        {getTranslatedText('opening-hours')}
      </Typography>
      {isFooter && <Divider className={classes.divider}></Divider>}
      <Grid container direction="column">
        {dateComponents}
      </Grid>
    </Box>
  )
}

Tider.defaultProps = {
  siteTitle: `Tider`,
}

export default Tider
