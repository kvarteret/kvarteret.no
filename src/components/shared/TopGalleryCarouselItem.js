import React from 'react'

import { Box, makeStyles, Typography, Link } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import FastAverageColor from 'fast-average-color'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 60,
  },
  img: {
    height: '240px',
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: '480px',
    },
  },
  imgText: {
    position: 'absolute',
    bottom: '30px',
    transform: 'translateZ(0)',
    left: '2%',
    color: 'white',
    WebkitTextStroke: '1.5px black',
    fontSize: 25,
    '@media (min-width:600px)': {
      fontSize: 50,
    },
    '@media (min-width:960px)': {
      fontSize: 80,
    },
  },

  carousel: {
    position: 'relative'
  },
}))

const LinkWrapper = ({ children, href }) => {
  if (href == null) {
    return children
  }

  return <Link href={href}>{children}</Link>
}

const TopGalleryCarouselItem = ({ item, styleImgText, link }) => {
  const classes = useStyles()

  const [color, setColor] = useState('#fff')
  useEffect(() => {
    const fac = new FastAverageColor();
    const fallback = item.imageFile?.childImageSharp?.gatsbyImageData?.placeholder?.fallback;
    if(fallback) {
      fac.getColorAsync(
          fallback   
        )
        .then(function (color) {
          setColor(color.isDark ? '#fff' : '#000')
        })
    }
  }, [])

  const textClasses =
    classes.imgText + ' ' + (color == '#000' ? classes.imgTextDark : '')

    const image = getImage(item.imageFile)
  return (
    <Box className={classes.carousel}>
      <LinkWrapper href={item.link}>
        <GatsbyImage image={image} className={classes.img} alt={item.text} />
        {item.text && (
          <Typography
            variant="h1"
            className={textClasses}
            style={{ color, ...styleImgText }}
          >
            {item.text}
          </Typography>
        )}
      </LinkWrapper>
    </Box>
  )
}

export default TopGalleryCarouselItem
