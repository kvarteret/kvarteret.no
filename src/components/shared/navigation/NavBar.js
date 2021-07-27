import { Grid, Menu, MenuItem } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Link } from 'gatsby'
import NestedMenuItem from 'material-ui-nested-menu-item'
import React from 'react'
import { GetNavItems } from '../../../helpers/navHelper'
import { center } from './NavBar.module.scss'

const NavMenuItem = ({ item, onClick, parentMenuOpen, handleClose }) => {
  if (item.children) {
    const menuItems = item.children.map((child, id) => (
      <NavMenuItem
        item={child}
        key={item.title + id}
        onClick={onClick}
        parentMenuOpen={parentMenuOpen}
        handleClose={handleClose}
      ></NavMenuItem>
    ))
    return (
      <NestedMenuItem
        label={item.title}
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
  const text = item.title

  if (item.children) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const menuItems = item.children.map((child, id) => (
      <NavMenuItem
        onClick={handleClick}
        handleClose={handleClose}
        parentMenuOpen={!!anchorEl}
        item={child}
        key={TextEvent + id}
      ></NavMenuItem>
    ))
    return (
      <div>
        <a onClick={handleClick} id={text} className="menu-item">
          {text}{' '}
          {(anchorEl && <ExpandLess className="float-right" />) || (
            <ExpandMore className="float-right" />
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
  const isButton = item.isButton
  const isExternal = item.url?.indexOf('www') != -1

  const LinkComponent = ({ className }) => {
    if (isExternal) {
      return (
        <a href={link} className={className} rel="noreferrer noopene">
          {text}
        </a>
      )
    }
    return (
      <Link to={link} className={className} rel="">
        {text}
      </Link>
    )
  }

  if (isButton) {
    return (
      <Grid item>
        <LinkComponent className={'nav-button'} />
      </Grid>
    )
  }
  // const link = '/en/page/vaktetaten'
  // TODO: Check if internal elemet
  return <LinkComponent className="menu-item" />
}

export default function NavBar({ isRightNav }) {
  let navItems = GetNavItems()

  navItems = isRightNav ? navItems.rightNavItems : navItems.leftNavItems
  return navItems.map((item, id) => (
    <Grid item className={center} key={id}>
      <NavItem item={item}></NavItem>
    </Grid>
  ))
}
