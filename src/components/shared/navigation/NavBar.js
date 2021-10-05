import { Grid, Menu, MenuItem } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Link } from 'gatsby'
import NestedMenuItem from 'material-ui-nested-menu-item'
import React from 'react'
import { GetNavItems } from '../../../helpers/navHelper'
import { center } from './NavBar.module.scss'

const LinkComponent = ({ className, children, link }) => {
  const isExternal = link.indexOf('www') != -1
  if (isExternal) {
    return (
      <a href={link} className={className} rel="noreferrer noopene">
        {children}
      </a>
    )
  }
  return (
    <Link to={link} className={className} rel="">
      {children}
    </Link>
  )
}

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
      <LinkComponent link={item.url}>
        <NestedMenuItem
          label={item.title}
          parentMenuOpen={parentMenuOpen}
          onClick={handleClose}
          className="menu-item"
        >
          {menuItems}
        </NestedMenuItem>
      </LinkComponent>
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
  const link = item.url

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
        key={id}
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

  const isButton = item.isButton

  if (isButton) {
    return (
      <Grid item>
        <LinkComponent link={link} className={'nav-button'}>
          {text}
        </LinkComponent>
      </Grid>
    )
  }
  // const link = '/en/page/vaktetaten'
  // TODO: Check if internal elemet
  return (
    <LinkComponent link={link} className="menu-item">
      {text}
    </LinkComponent>
  )
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
