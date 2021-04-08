import React from 'react'
import {
  Center,
  Link as LinkCss,
  becomeVolunteer,
} from './NavigationItems.module.css'
import { Link } from 'gatsby'
import { Grid } from '@material-ui/core'

const navigationItems = () => (
  <div>
    <Grid item className={Center}>
      {' '}
      <Link to="#" className="active">
        {' '}
        Aktuelt
      </Link>{' '}
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Kafèmeny
      </Link>
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Butikk
      </Link>
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Rombooking
      </Link>{' '}
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Bilder
      </Link>
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Om oss
      </Link>
    </Grid>
    <Grid item className={Center}>
      <Link className={LinkCss} to="#">
        Kontakt
      </Link>
    </Grid>
    <Grid item className={Center}>
      <Link
        className={LinkCss}
        to="#"
        className={becomeVolunteer}
        component="button"
      >
        Bli frivillig
      </Link>
    </Grid>
  </div>
)

export default navigationItems
