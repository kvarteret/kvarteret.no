import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { getTranslation } from '../../helpers/languageHelper'
import { getTranslatedText } from '../../helpers/textHelper'

import ReklameFile from '../../images/reklamefilm.mp4'

function scrollTo(elem) {
  const element = document.querySelector(elem)

  if (element) {
    const yOffset = -100
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })

    return true
  }
}

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    height: 100,
    maxWidth: 550,
    border: '3px solid white',
    color: 'white',
    '&:hover': { backgroundColor: 'white', color: '#f54b4b' },
  },
}))

export default function TopSection({ videoUrl }) {
  const styles = useStyles()

  return (
    <div>
      <div className="video-background">
        <video
          id="BgVideo"
          width="100%"
          height="85vh"
          muted
          autoPlay
          loop
          playsInline
          poster="https://cms.kvarteret.no/assets/5df422aa-a791-4bad-adde-65c29b618865"
        >
          <source src={`${ReklameFile}`} type="video/mp4" />
        </video>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.6,
          margin: 'auto',
          backgroundColor: '#F54B4B',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: '16px',
        }}
      >
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            minHeight: '85vh',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Grid item xs={12} lg={9}>
            <Typography variant="h1">
              {getTranslatedText('blifrivillig-title')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography variant="h3">
              {getTranslatedText('blifrivillig-description')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            style={{ width: '100%', marginTop: '20px' }}
          >
            <Button
              component={'a'}
              underline="none"
              variant="outlined"
              onClick={() => scrollTo('#signup')}
              fullWidth
              className={styles.buttonStyle}
            >
              <Typography variant="h2">
                {getTranslatedText('blifrivillig-call-to-action')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 16,
          margin: 'auto',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h5">
          {getTranslatedText('blifrillig-learn-more')}
        </Typography>
      </div>
    </div>
  )
}
