import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import './header.scss'
import { Box, Divider, Grid, Hidden, makeStyles } from '@material-ui/core'
import LanguageSelector from './languageSelector'
import Sidedrawer from '../navigation/SideDrawer/Sidedrawer'

import NavBar from '../navigation/NavBar'
import { getFullImageUrl } from '../../../helpers/fileHelper'

import Logo from '../../../images/logo.png'
import HovedLogo from '../../../images/Hoved logo.png'

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 4px 4px rgba(0,0,0,0.4)',
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

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      directus {
        items {
          general_information {
            logo {
              id
            }
            hoved_logo {
              id
            }
          }
        }
      }
    }
  `)
  const generalInfo = data.directus.items.general_information
  const logoPath = getFullImageUrl(generalInfo.logo.id)
  const mainLogoPath = getFullImageUrl(generalInfo.hoved_logo.id)

  return (
    <Grid
      container
      direction="row"
      className={classes.root}
      justify="space-between"
      alignItems="center"
    >
      <Grid
        item
        xs={4}
        lg={1}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Hidden lgUp={true}>
          <Grid
            item
            className={classes.hamburger + ' ' + classes.center}
            onClick={open}
          >
            <Sidedrawer />
          </Grid>
          <Divider
            variant="fullWidth"
            className={classes.divider}
            orientation="vertical"
            flexItem
          />
        </Hidden>
        <Hidden mdDown>
          <Link to="/">
            <Grid container alignItems="center" justify="center">
              <img
                src={HovedLogo}
                height="80px"
                width="100%"
                style={{
                  objectFit: 'contain',
                  minWidth: '106px',
                  backgroundColor: '#f54b4b',
                }}
              ></img>
            </Grid>
          </Link>
        </Hidden>
      </Grid>

      <Grid
        item
        xs={1}
        lg={4}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Hidden mdDown={true}>
          <NavBar />
        </Hidden>
      </Grid>
      <Grid
        item
        xs={2}
        lg={2}
        container
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Link to="/">
          <img src={Logo} alt="Kvarteret's logo" className={classes.logo}></img>
        </Link>
      </Grid>
      <Grid
        item
        xs={1}
        lg={4}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={4}
      >
        <Hidden mdDown={true}>
          <NavBar isRightNav={true} />
        </Hidden>
      </Grid>
      <Grid
        item
        xs={4}
        lg={1}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Divider className={classes.divider2} orientation="vertical" flexItem />
        <Grid item className={classes.hamburger}>
          <LanguageSelector />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
