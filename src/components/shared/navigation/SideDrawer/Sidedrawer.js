import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import NavigationItems from '../NavigationItems/NavigationItems'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import HovedLogo from '../../../../images/Kvarteret hovedlogo.svg'

import {
  Box,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamburger: {
    width: 80,
    height: 80,
    cursor: 'pointer',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  Logo: {
    height: '50px',
    paddingLeft: '70px',
    paddingRight: '80px',
  },
  Arrow: {
    height: '10px',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 0 10px gray',
    paddingBottom: '4.66px',
    paddingTop: '4.66px',
  },
  SearchContainer: {
    textAlign: 'center',
  },
  Search: {
    height: '35px',
    marginTop: '25px',
    boxShadow: '0 0 10px gray',
    width: '80%',
  },
})

export default function sideDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        className={classes.ImageContainer}
      >
        <Grid
          item
          xs={2}
          style={{ cursor: 'pointer' }}
          onClick={toggleDrawer(anchor, false)}
        >
          <ArrowBackIcon style={{ height: '40px' }} fontSize="large" />
        </Grid>
        <Grid item xs={8}>
          <Link to="/">
            <img src={HovedLogo} width="80%"></img>
          </Link>
        </Grid>
      </Grid>
      {/* <div className={classes.SearchContainer}>
        <input placeholder="Søk" className={classes.Search}></input>
      </div> */}
      <List>
        <NavigationItems />
      </List>
    </div>
  )
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  return (
    <div>
      <Button
        className={classes.hamburger + ' ' + classes.center}
        onClick={toggleDrawer('left', true)}
        
      >
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor={'left'}
        open={state['left']}
        onOpen={toggleDrawer('left', true)}
        onClose={toggleDrawer('left', false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {list('left')}
      </SwipeableDrawer>
    </div>
  )
}
