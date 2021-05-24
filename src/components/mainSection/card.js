import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box, CardActionArea, CardMedia } from '@material-ui/core'
import { ContactsOutlined, LineWeight } from '@material-ui/icons'
import { Link } from 'gatsby'
import { getTranslatedText } from '../../helpers/textHelper'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const useStyles = makeStyles({
  root: {
    height: '100%',
    borderRadius: 0,
  },
  rootShadow: {
    boxShadow: '0px 3px 4px rgba(0,0,0,0.16)',
  },
  actionArea: {
    height: '100%',
    paddingBottom: '4px',
  },
  content: {
    padding: '2px 8px',
    height: '100%',
  },
  media: {
    marginBottom: 0,
  },

  dateText: {
    fontSize: 10,
    margin: 2,
    textTransform: 'uppercase',
  },

  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  ticket: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#f54b4b',
    padding: '10px 30px',
    color: 'white',
    border: '1px solid white',
    '&:hover': {
      backgroundColor: '#FF6767',
    },
  },

  text: {
    fontSize: 12,
    lineHeight: '14px',
    display: 'inline-block',
    '& *': {
      margin: 0,
      marginBottom: 4,
    },
  },
})

export default function EventCard({
  imgSrc,
  alt,
  date,
  title,
  text,
  url,
  ticketUrl,
  room,
}) {
  const classes = useStyles()

  const [raised, setRaised] = useState(false)

  const image = getImage(imgSrc)
  return (
    <a href={url}>
      <Card
        className={classes.root + ' ' + (raised ? '' : classes.rootShadow)}
        raised={raised}
        onMouseOver={() => setRaised(true)}
        onMouseOut={() => setRaised(false)}
      >
        <CardActionArea className={classes.actionArea}>
          <Box className={classes.imageContainer}>
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
            {ticketUrl && (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.ticket}
              >
                {getTranslatedText('buy-ticket')}
              </a>
            )}
          </Box>
          <CardContent className={classes.content}>
            <Typography gutterBottom className={classes.dateText}>
              {date}
              {room && ' | ' + room}
            </Typography>
            <Typography variant={'h1'} component="h1" className={classes.title}>
              {title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  )
}
