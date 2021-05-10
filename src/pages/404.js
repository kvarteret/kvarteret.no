import React from 'react'

import Layout from '../components/shared/layout/layout'
import SEO from '../components/seo'
import {
  Paper,
  Grid,
  Typography,
<<<<<<< Updated upstream
  darken,
  Box,
  Link,
  Button,
} from '@material-ui/core'
import BgImg from '../images/sad_penguin.jpg'
import { relativeTimeRounding } from 'moment'
import { graphql, StaticQuery, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { UrlLanguageCode } from '../helpers/languageHelper'
import { getTranslatedText } from '../helpers/textHelper'
=======
  Button,
  ThemeProvider,
} from '@material-ui/core'
import BgImg from '../images/sad_penguin.jpg'

const theme = {
  typography: {
    h1: {
      fontSize: '120px',
      color: 'white',
      fontWeight: '600',
      letterSpacing: '2px',
    },
    h6: {
      fontSize: '18px',
      color: 'white',
      fontWeight: '500',
      letterSpacing: '1px',
    },
    body1: {
      fontSize: '14px',
      color: 'white',
      letterSpacing: '1px',
    },
  },
}
>>>>>>> Stashed changes

const styles = {
  backgroundContainer: {
    gridArea: '1/1',
    mixBlendMode: 'multiply',
  },
  otherContainer: {
    gridArea: '1/1',
    position: 'relative',
  },
  boxStyleOuter: {
    width: '100%',
    height: '100%',
  },
  boxStyleInner: {
    padding: '0 10vw 0 10vw',
  },
  buttonStyle: {
    margin: '2vh 0 0 0',
    backgroundColor: 'white',
  },
}

<<<<<<< Updated upstream
const NotFoundPage = () => {
  return (
    <Layout spacingTop={false}>
      <SEO title="404" />
      <div style={{ display: 'grid', backgroundColor: '#f54B4B' }}>
        <StaticImage
          src="../images/sad_penguin.jpg"
          placeholder="blurred"
          blurredOptions={{ width: 50 }}
          style={styles.backgroundContainer}
        />
        <Box style={styles.otherContainer}>
          <Grid container direction="row" alignItems="stretch">
            <Grid item md={6} xs={12}></Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{
                margin: 'auto',
                height: '100vh',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Box m={2}>
                <Grid item>
                  <Typography variant="h1" style={{ fontSize: 150 }}>
                    404
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{ fontSize: 28 }}>
                    {getTranslatedText('404-title')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {getTranslatedText('404-description')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box mt={4}>
                    <Button
                      component={Link}
                      href={'/' + UrlLanguageCode()}
                      underline="none"
                      variant="contained"
                      fullWidth="true"
                      color="white"
                      style={{ height: 55 }}
                    >
                      <Typography variant="h6" color="primary">
                        {getTranslatedText('go-back-to-main-page')}
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Layout>
  )
}
=======
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Paper style={styles.backgroundContainer} alignItems="right">
      <Grid
        style={styles.boxStyleOuter}
        container
        color="white"
        direction="row"
        justify="flex-end"
        alignItems="right"
      >
        <Grid
          style={styles.boxStyleInner}
          xs={12}
          lg={6}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6" align="center">
              Pingvinen kunne ikke finne siden!
            </Typography>
            <Typography variant="body1" align="center" margin-bottom="2vh">
              Men frykt ikke! Du kan hjelpe han å finne veien tilbake ved å
              klikke knappen under.
            </Typography>
          </ThemeProvider>
          <Grid style={styles.buttonStyle}>
            <Button href="google.com">Tilbake til hovedsiden</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Layout>
)
>>>>>>> Stashed changes

export default NotFoundPage
