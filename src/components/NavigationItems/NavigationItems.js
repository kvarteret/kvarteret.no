import React from 'react'
import classes from './NavigationItems.module.css'
import { Link } from 'gatsby'
import { Grid } from '@material-ui/core'

const navigationItems = () => (
  <div>
    <Grid item className={classes.Center}>
      {' '}
      <Link to="#" className="active">
        {' '}
        Aktuelt
      </Link>{' '}
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Kafèmeny
      </Link>
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Butikk
      </Link>
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Rombooking
      </Link>{' '}
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Bilder
      </Link>
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Om oss
      </Link>
    </Grid>
    <Grid item className={classes.Center}>
      <Link className={classes.Link} to="#">
        Kontakt
      </Link>
    </Grid>
    <Grid item className={classes.Center}>
      <Link
        className={classes.Link}
        to="#"
        className={classes.becomeVolunteer}
        component="button"
      >
        Bli frivillig
      </Link>
    </Grid>
  </div>
)

export default navigationItems
