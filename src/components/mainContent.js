import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import EventCard from './card'
import EventSection from './eventSection'

import NewsCard from './newsCard'
import NewsSection from './newsSection'
import OpeningHoursSection from './openingHoursSection'
import TodaySection from './todaySection'
import EventPage from './eventPage'
import './mainContent.scss'
import Tider from './tider'
import DAKCarousel from './dakCarousel'
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

const CarouselItem = ({ item }) => {
  const classes = useStyles()

  const [color, setColor] = useState('#fff')
  useEffect(() => {
    const fac = new FastAverageColor()
    fac.getColorAsync(item.img, { width: 500 }).then(function (color) {
      setColor(color.isDark ? '#fff' : '#000')
    })
  }, [])

  const textClasses =
    classes.imgText + ' ' + (color == '#000' ? classes.imgTextDark : '')

  return (
    <Box className={classes.carousel}>
      <img className={classes.img} src={item.img} />
      <Typography variant="h1" className={textClasses} style={{ color }}>
        {item.text}
      </Typography>
    </Box>
  )
}

const MainContent = ({ content }) => {
  const classes = useStyles()
  return (
    <div>
      <Grid container direction="column" className={classes.root}>
        <Grid item xs={12} className={classes.imgContainer}>
          <DAKCarousel
            animationSpeed={1000}
            items={[
              {
                img:
                  'https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg',
                text: 'Minner fra Datarock',
              },
              {
                img:
                  'https://kvarteret.no/wp-content/uploads/2021/02/Upop7-2.jpg',
                text: 'Fremtidens sykdommer',
              },
            ]}
            template={CarouselItem}
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
/* 
<Grid container direction="column" className={classes.root}>
            <Grid item xs={12} className={classes.imgContainer}>
                <img className={classes.img} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
                <Typography variant="h1" className={classes.imgText}>Minner fra Datarock</Typography>
            </Grid>
            <Grid item className={classes.content}>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={6} lg={8} xl={9}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={8}>
                                <TodaySection/>
                            </Grid>
                            <Grid item xs={12} md= {12} lg={4}>
                                <OpeningHoursSection/>
                            </Grid>
                            <Grid item xs={12}>
                                <EventSection/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} xl={3}>
                        <NewsSection/>
                    </Grid>            
                </Grid>
            </Grid>
        </Grid> */
