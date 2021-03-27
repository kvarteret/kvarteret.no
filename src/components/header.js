import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import { Link } from 'gatsby'
import './header.scss'
import SearchIcon from '@material-ui/icons/Search'
import {
  Box,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import LanguageSelector from './languageSelector'
import Sidedrawer from "./SideDrawer/Sidedrawer"

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 10,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.16)',
    height: 80,
    position: 'fixed',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1100,
  },
  hamburger: {
    width: 80,
    cursor: 'pointer',
  },
  divider: {
    height: 80,
  },
  divider2: {
    height: 80,
    marginLeft: 8,
  },
  logo: {
    width: 60,
    height: 60,
    margin: 0,
  },
  languageSize: {
    fontSize: 12,
  },
  languageDivider: {
    height: 16,
    background: '#6B6B6B',
  },
  becomeVolunteer: {
    background: '#F54B4B',
    color: 'white',
    height: 40,
    padding: '0 30px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '40px',
    '&:hover': {
      background: '#F85B5B',
      color: 'white',
    },
    '&:active': {
      background: '#F23B3B',
      color: 'white',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
})

//TODO: gi a element padding sånn at de ser fine ut
const Header = ({ siteTitle, open, closed }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="row"
      className={classes.root}
      justify="space-between"
      alignItems="center"
    >
      <Grid item md={1} lg={5}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={4}
        >
          <Hidden lgUp={true}>
            <Grid
              item
              className={classes.hamburger + ' ' + classes.center}
              onClick={open}
            >
              <Sidedrawer />
            </Grid>
          </Hidden>
          <Divider
            variant="fullWidth"
            className={classes.divider}
            orientation="vertical"
            flexItem
          />
          <Hidden mdDown={true}>
            <Grid item className={classes.center}>
              <Link to="#" className="active">
                Aktuelt
              </Link>
            </Grid>
            <Grid item className={classes.center}>
              <Link to="/cafe_page">Kafèmeny</Link>
            </Grid>
            <Grid item className={classes.center}>
              <Link to="https://butikk.kvarteret.no/">Butikk</Link>
            </Grid>
            <Grid item className={classes.center}>
              <Link to="#">Rombooking</Link>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item>
        <Link to="/">
          <img
            src="https://kvarteret.no/wp-content/uploads/dak-logo/Kvarteret_logo_rod.png"
            className={classes.logo}
          ></img>
        </Link>
      </Grid>
      <Grid item md={1} lg={5}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={4}
        >
          <Hidden mdDown={true}>
            <Grid item>
              <Link to="https://bilder.kvarteret.no/">Bilder</Link>
            </Grid>
            <Grid item>
              <Link to="/about">Om oss</Link>
            </Grid>
            <Grid item>
              <Link to="#">Kontakt</Link>
            </Grid>
            <Grid item>
              <Link
                to="https://blifrivillig.no/"
                className={classes.becomeVolunteer}
                component="button"
              >
                Bli frivillig
              </Link>
            </Grid>
          </Hidden>
          <Divider
            className={classes.divider2}
            orientation="vertical"
            flexItem
          />
          <Grid item className={classes.hamburger}>
            <LanguageSelector />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
