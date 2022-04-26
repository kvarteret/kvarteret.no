import { Button, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

import TranslatedField from './TranslatedField'
import styles from "../styles/TopSection.module.css"
import { useRouter } from 'next/router'
import { Link } from 'dak-components'

function scrollTo(elem) {
  const element = document.querySelector(elem)

  if (element) {
    const yOffset = -100
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })

    return true
  }
}


export default function TopSection({ videoUrl }) {
  const router = useRouter();
  const isNo = router.locale === "no";
  return (
    <div>
      <div className={styles.video}>
        <video
          id="BgVideo"
          width="100%"
          height="85vh"
          muted
          autoPlay
          preload="none"
          loop
          playsInline
          poster="/video/poster.png"
        >
          <source src="/video/reklamefilm.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.topContainer}></div>
      <div className={styles.middleContainer}>
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{
            minHeight: '85vh',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Grid item xs={12} lg={9}>
            <Typography variant="h1">
                <TranslatedField tKey="blifrivillig-title"/>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography variant="h3">
                <TranslatedField tKey="blifrivillig-description"/>
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
              classes={{root: styles.button}}
            >
              <Typography variant="h2">
                <TranslatedField tKey="blifrivillig-call-to-action"/>
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} lg={9}>
            
          <Typography variant="h6">
            <Link href={router.asPath} locale={isNo ? "en" : "no"}>
               <a className="light"> <TranslatedField tKey="blifrivillig-or-in"/></a>
                </Link>
            </Typography>
            </Grid>
        </Grid>
      </div>

      <div className={styles.bottomContainer}>
        <Typography variant="h5">
            <TranslatedField tKey="blifrivillig-learn-more"/>
        </Typography>
      </div>
    </div>
  )
}