import React from 'react'
import classes from './NavigationItems.module.css'
import { Link } from 'gatsby'

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <Link to="#" className="active">
      Aktuelt
    </Link>
    <Link to="#">Kafèmeny</Link>
    <Link to="#">Butikk</Link>
    <Link to="#">Rombooking</Link>
    <Link to="#">Bilder</Link>
    <Link to="#">Om oss</Link>
    <Link to="#">Kontakt</Link>
    <Link to="#" className={classes.becomeVolunteer} component="button">
      Bli frivillig
    </Link>
  </ul>
)

export default navigationItems
