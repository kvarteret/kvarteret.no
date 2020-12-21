import PropTypes from 'prop-types'
import React from 'react'
import q from 'qjuul'

import { Link } from 'gatsby'



import './footer.scss'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  title: {
    color: "white",
  },
  divider: {
    backgroundColor: "#707070",
    height: 1,
    marginBottom: 11,
    marginTop: 10
  },
  textTitle: {
    fontSize: 12,
    marginTop: 4,
    color: "white"
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    color: "#929292"
  }
});


const Tider = ({ siteTitle }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h2" className={classes.title}>ÅPNINGSTIDER</Typography>
      <Divider className={classes.divider}></Divider>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.text}>STJERNESALEN</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.textTitle}>11:30 - 20:00</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.text}>GRØNDAHLS</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.textTitle}>19:30 - 00:30</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.text}>TEGLVERKET</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.textTitle}>21:00 - 00:30</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.text}>HALVTIMEN</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.textTitle}>21:00 - 00:30</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" className={classes.textTitle}>ÅPENT VED ARRANGEMENT</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}


Tider.defaultProps = {
  siteTitle: `Tider`,
}

export default Tider