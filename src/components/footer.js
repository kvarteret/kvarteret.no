import React from 'react'

import { Link } from 'gatsby'
import Tider from './tider.js'
import Kontakt from './kontakt.js'

import BergenImage from '../images/footer_bergen.png'

import './footer.scss'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    background: `url(\"${BergenImage}\") no-repeat`,
    backgroundPositionX: 'center',
    backgroundColor: '#272727',
    backgroundBlendMode: 'color-dodge',
    backgroundSize: 'cover',
    paddingBottom: '10px',
    width: '100%',
  },
  content: {
    paddingTop: 90,
    paddingBottom: 35,
    width: '100%',
    margin: 0,
  },
})

const Footer = ({ siteTitle }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="row-reverse"
        justify="space-around"
        alignItems="stretch"
        spacing={8}
        className={classes.content}
      >
        <Grid item xs={12} md={3} xl={2}>
          <Tider />
        </Grid>
        <Grid item xs={12} md={5} lg={4} xl={3}>
          <Kontakt />
        </Grid>
      </Grid>
      <Typography align="center" color="primary">
        Copyright © 2020 Studentkulturhuset i Bergen AS (org. nr. 973 199 986
        MVA) - ❤️ fra IT-gruppen
      </Typography>
    </Box>
  )
}

Footer.defaultProps = {
  siteTitle: `Footer`,
}

export default Footer
