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

import {
  Box,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamburger: {
    width: 80,
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
    paddingBottom: '15px',
    paddingTop: '15px',
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
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.ImageContainer}
      >
        <Grid item xs={2}>
          <ArrowBackIcon style={{ height: '40px' }} fontSize="large" />
        </Grid>
        <Grid item xs={8}>
          <img
            style={{ height: '50px' }}
            src="https://kvarteret.no/wp-content/uploads/dak-logo/Kvarteret_logo_rod.png"
          ></img>
        </Grid>
      </Grid>
      <div className={classes.SearchContainer}>
        <input placeholder="Søk" className={classes.Search}></input>
      </div>
      <List>
        <NavigationItems />
      </List>
    </div>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={classes.hamburger + ' ' + classes.center}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
