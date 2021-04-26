import React from 'react'

import { Box, makeStyles, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import FastAverageColor from 'fast-average-color'

const useStyles = makeStyles({
  root: {
    marginBottom: 60,
  },
  img: {
    height: '480px',
    width: '100%',
    objectFit: 'cover',
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

const TopGalleryCarouselItem = ({ item }) => {
  const classes = useStyles()

  const [color, setColor] = useState('#fff')
  useEffect(() => {
    const fac = new FastAverageColor()
    fac
      .getColorAsync(
        item.imageFile.childImageSharp.gatsbyImageData.placeholder.fallback
      )
      .then(function (color) {
        setColor(color.isDark ? '#fff' : '#000')
      })
  }, [])

  const textClasses =
    classes.imgText + ' ' + (color == '#000' ? classes.imgTextDark : '')

  const image = getImage(item.imageFile)
  return (
    <Box className={classes.carousel}>
      <GatsbyImage image={image} className={classes.img} alt={item.text} />
      {item.text && (
        <Typography variant="h1" className={textClasses} style={{ color }}>
          {item.text}
        </Typography>
      )}
    </Box>
  )
}

export default TopGalleryCarouselItem
