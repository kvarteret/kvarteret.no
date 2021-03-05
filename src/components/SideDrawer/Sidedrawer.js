import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import NavigationItems from '../../components/NavigationItems/NavigationItems'
import classes from './Sidedrawer.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {
  Box,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.NavOpen]
  const openClass = props.open ? classes.NavOpen : classes.NavClosed
  return (
    <div className={openClass}>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.ImageContainer}>
          <ArrowBackIcon style={{ height: '40px' }} fontSize="large" />
          <img
            src="https://kvarteret.no/wp-content/uploads/dak-logo/Kvarteret_logo_rod.png"
            className={classes.Logo}
          ></img>
        </div>
        <div className={classes.SearchContainer}>
          <input placeholder="Søk" className={classes.Search}></input>
          <button type="submit" className={classes.Button}></button>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  )
}

export default sideDrawer
