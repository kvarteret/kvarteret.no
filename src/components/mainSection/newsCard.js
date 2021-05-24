import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardActionArea, CardMedia, Grid, Hidden } from '@material-ui/core'
import { LineWeight } from '@material-ui/icons'
import moment from 'moment'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
  },
  content: { width: 'calc(100% - 74px)' },
  media: {
    marginBottom: 0,
    objectFit: 'cover',
    height: '100%',
  },

  dateText: {
    fontSize: 10,
    margin: 2,
    marginTop: 0,
    textTransform: 'uppercase',
  },

  title: {
    fontSize: 16,
    color: '#F54B4B',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 0,
  },

  text: {
    fontSize: 12,
    lineHeight: '14px',
    display: 'inline-block',
    overflow: 'hidden',
  },
})

export default function NewsCard({ imgSrc, alt, date, title, text, url }) {
  const classes = useStyles()
  const image = getImage(imgSrc)
  return (
    <CardActionArea href={url}>
      <Grid container spacing={1} direction="row" className={classes.root}>
        <Hidden xsDown={false}>
          <Grid item>
            <GatsbyImage
              className={classes.media}
              image={image}
              title={title}
              alt={alt}
            />

            {/* <CardMedia
              component="img"
              className={classes.media}
              image={imgSrc}
              title={title}
              alt={alt}
            /> */}
          </Grid>
        </Hidden>
        <Grid item className={classes.content}>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant={'h1'}
                component="h1"
                className={classes.title}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom className={classes.dateText}>
                {moment(date).format('DD.MM.YYYY HH:mm')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.text}>{text}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardActionArea>
  )
}
