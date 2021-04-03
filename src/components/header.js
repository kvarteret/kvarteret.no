import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import { Link } from 'gatsby'
import './header.scss'
import SearchIcon from '@material-ui/icons/Search'
import {
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import LanguageSelector from './languageSelector'
import Sidedrawer from './SideDrawer/Sidedrawer'
import { GetLeftNavItems } from '../helpers/navHelper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ExpandLess } from '@material-ui/icons'
import NestedMenuItem from 'material-ui-nested-menu-item'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 10,
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

const NavMenuItem = ({ item, onClick, parentMenuOpen, handleClose }) => {
  if (item.items) {
    const menuItems = item.items.map((child, id) => (
      <NavMenuItem
        item={child}
        key={item.text + id}
        onClick={onClick}
        parentMenuOpen={parentMenuOpen}
        handleClose={handleClose}
      ></NavMenuItem>
    ))
    return (
      <NestedMenuItem
        label={item.text}
        parentMenuOpen={parentMenuOpen}
        onClick={handleClose}
        className="menu-item"
      >
        {menuItems}
      </NestedMenuItem>
    )
  }
  return (
    <MenuItem onClick={handleClose}>
      <NavItem item={item}></NavItem>
    </MenuItem>
  )
}

const NavItem = ({ item }) => {
  // TODO: Dropdown menu
  console.log('ITEM', item)
  const text = item.text

  if (item.items) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
      console.log('Click', event)
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const menuItems = item.items.map((child, id) => (
      <NavMenuItem
        onClick={handleClick}
        handleClose={handleClose}
        parentMenuOpen={!!anchorEl}
        item={child}
        key={item.text + id}
      ></NavMenuItem>
    ))
    return (
      <div>
        <a onClick={handleClick} id={text} className="menu-item">
          {text}{' '}
          {(anchorEl && <ExpandLess className="float-right" />) || (
            <ExpandMoreIcon className="float-right" />
          )}
        </a>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          disableScrollLock
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant="menu"
          className={'navbar-menu'}
        >
          {menuItems}
        </Menu>
      </div>
    )
  }

  const link = item.url
  // const link = '/en/page/vaktetaten'
  // TODO: Check if internal elemet
  return (
    <Link to={link} className="menu-item">
      {text}
    </Link>
  )
}

//TODO: gi a element padding sånn at de ser fine ut
const Header = ({ siteTitle, open, closed }) => {
  const classes = useStyles()

  const navItems = GetLeftNavItems()
  const leftNav = navItems.map((item, id) => (
    <Grid item className={classes.center}>
      <NavItem item={item} key={id}></NavItem>
    </Grid>
  ))
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
          <Divider
            variant="fullWidth"
            className={classes.divider}
            orientation="vertical"
            flexItem
          />
        </Hidden>
      </Grid>

      <Grid item xs={1} lg={4}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={4}
        >
          <Hidden mdDown={true}>{leftNav}</Hidden>
        </Grid>
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
          <img
            src="https://kvarteret.no/wp-content/uploads/dak-logo/Kvarteret_logo_rod.png"
            className={classes.logo}
          ></img>
        </Link>
      </Grid>
      <Grid item xs={1} lg={4}>
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
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        lg={1}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={4}
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
