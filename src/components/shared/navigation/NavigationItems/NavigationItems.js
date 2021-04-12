import React, { useState } from 'react'
import {
  Center,
  Link as LinkCss,
  becomeVolunteer,
  ListItem as ListItemCss,
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
        <ListItem button onClick={handleClick} className={ListItemCss}>
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
      <ListItem button className={ListItemCss}>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    </Link>
  )

  if (isButton) {
    linkElem = (
      <ListItem button className={ListItemCss}>
        <ListItemText>
          <Link
            className={LinkCss}
            to={link}
            className={becomeVolunteer}
            component="button"
          >
            {text}
          </Link>
        </ListItemText>
      </ListItem>
    )
  }

  return linkElem
}

const navigationItems = () => {
  const navItems = GetNavItems()

  const topItems = [...navItems.leftNavItems]
  const elements = topItems.map((item, id) => (
    <NavItem key={id} item={item} />
    // <Grid key={id} item className={Center}>
    // </Grid>
  ))

  return (
    <Grid container direction="column" justify="space-between">
      <Grid item>{elements}</Grid>
      <Grid item>{elements}</Grid>
    </Grid>
  )
}

export default navigationItems
