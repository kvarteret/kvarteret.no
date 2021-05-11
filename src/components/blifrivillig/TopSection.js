import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
    height: 120,
    maxWidth: 950,
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
        {/* <iframe
          width="100%"
          height="75vh"
          muted
          autoPlay
          src={`${videoUrl}?controls=0&rel=0&showinfo=0&playlist=P7SbB2_HW1o&autoplay=1&loop=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
        <video width="100%" height="75vh" muted autoPlay loop playsInline>
          <source
            src="https://cms.kvarteret.no/assets/7a7f4be2-c538-4006-9edd-beaa7fccd61a"
            type="video/mp4"
          />
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
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            minHeight: '75vh',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h1">
              Få mer ut av studietiden med oss!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">
              Venner for livet, erfaring å være stolt av og minner du aldri vil
              glemme!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ width: '100%', marginTop: '60px' }}
          >
            <Button
              component={'a'}
              underline="none"
              variant="outlined"
              onClick={() => scrollTo('#signup')}
              fullWidth
              className={styles.buttonStyle}
            >
              <Typography variant="h2">Bli frivillig nå!</Typography>
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
        <Typography variant="h4">Eller lær mer om kvarteret under</Typography>
      </div>
    </div>
  )
}
