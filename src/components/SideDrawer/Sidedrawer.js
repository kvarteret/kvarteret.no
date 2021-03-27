import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import NavigationItems from '../../components/NavigationItems/NavigationItems'
import {
  SideDrawer,
  NavOpen,
  NavClosed,
  ImageContainer,
  SearchContainer,
  Search,
} from './Sidedrawer.module.css'
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
  let attachedClasses = [SideDrawer, NavOpen]
  const openClass = props.open ? NavOpen : NavClosed
  return (
    <div className={openClass}>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={ImageContainer}
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
        <div className={SearchContainer}>
          <input placeholder="Søk" className={Search}></input>
        </div>
        <Grid container direction="column" style={{ height: '100%' }}>
          <nav>
            <NavigationItems />
          </nav>
        </Grid>
      </div>
    </div>
  )
}

export default sideDrawer
