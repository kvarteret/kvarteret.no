import React, { useState } from 'react'
import {
  Center,
  Link as LinkCss,
  becomeVolunteer,
} from './NavigationItems.module.css'
import { Link } from 'gatsby'
import { Collapse, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { GetNavItems } from '../../../../helpers/navHelper'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const NavItem = ({ item }) => {
  const text = item.text
  if (item.items) {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(!open)
    }

    const childElements = item.items.map((item, id) => (
      <NavItem key={id} item={item} />
    ))

    return (
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div style={{ paddingLeft: '8px' }}>{childElements}</div>
          </List>
        </Collapse>
      </div>
    )
  }
  const link = item.url
  const isButton = item.isButton

  let linkElem = (
    <Link className={LinkCss} to={link}>
      {text}
    </Link>
  )

  if (isButton) {
    linkElem = (
      <Link
        className={LinkCss}
        to={link}
        className={becomeVolunteer}
        component="button"
      >
        {text}
      </Link>
    )
  }

  return (
    <ListItem button>
      <ListItemText>{linkElem}</ListItemText>
    </ListItem>
  )
}

const navigationItems = () => {
  const navItems = GetNavItems()

  const allItems = [...navItems.leftNavItems, ...navItems.rightNavItems]
  const elements = allItems.map((item, id) => (
    <NavItem key={id} item={item} />
    // <Grid key={id} item className={Center}>
    // </Grid>
  ))

  return (
    <div>
      {/* <Grid item className={Center}>
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
      </Grid> */}
      {elements}
    </div>
  )
}

export default navigationItems
