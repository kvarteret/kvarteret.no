import React from 'react'

import Layout from '../components/shared/layout/layout'
import SEO from '../components/seo'
import {
  Paper,
  Grid,
  Typography,
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

const styles = {
  backgroundContainer: {
    gridArea: '1/1',
    mixBlendMode: 'multiply',
  },
  otherContainer: {
    gridArea: '1/1',
    position: 'relative',
  },
  boxStyle: {
    width: '130%',
    height: '100%',
  },
  boxStyleRow: {
    width: '50%',
    height: '50%',
  },
}

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

export default NotFoundPage
