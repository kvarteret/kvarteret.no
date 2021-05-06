import React from 'react'

import Layout from '../components/shared/layout/layout'
import SEO from '../components/seo'
import { Paper, Grid, Typography, darken } from '@material-ui/core'
import BgImg from '../images/sad_penguin.jpg'
import { relativeTimeRounding } from 'moment'

const styles = {
  backgroundContainer: {
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${BgImg})`,
    padding: '0',
    margin: '0',
    backgroundSize: 'cover',
    backgroundColor: '#F54B4B',
    backgroundBlendMode: 'multiply',
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

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Paper style={styles.backgroundContainer}>
      <Grid
        style={styles.boxStyleRow}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid
          style={styles.boxStyle}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            Pingvinen kunne ikke finne siden!
          </Typography>
          <Typography variant="body1">
            Men frykt ikke! Du kan hjelpe han å finne veien tilbake ved å klikke
            knappen under.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Layout>
)

export default NotFoundPage
