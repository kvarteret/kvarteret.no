import React from 'react'

import { Link } from 'gatsby'
import Tider from '../tider.js'
import Kontakt from './kontakt.js'

import BergenImage from '../../../images/footer_bergen.png'

import './footer.scss'
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  createStyles,
} from '@material-ui/core'
import SoMeLinks from '../soMeLinks.js'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: `url(\"${BergenImage}\") no-repeat`,
      backgroundPositionX: 'center',
      backgroundColor: '#272727',
      backgroundBlendMode: 'color-dodge',
      backgroundSize: 'cover',
      paddingBottom: '10px',
      width: '100%',
    },
    content: {
      paddingTop: 90,
      paddingBottom: 35,
      width: '100%',
      margin: 0,
    },
    item1: {
      order: 3,
      [theme.breakpoints.down('sm')]: {
        order: 2,
      },
    },
    item2: {
      order: 2,
      [theme.breakpoints.down('sm')]: {
        order: 1,
      },
    },
    item3: {
      order: 1,
      [theme.breakpoints.down('sm')]: {
        order: 3,
      },
    },
  })
)

const Footer = ({ siteTitle }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Grid
        container
        justify="space-evenly"
        alignItems="stretch"
        spacing={8}
        className={classes.content}
      >
        <Grid item xs={12} md={4} xl={3} className={classes.item1}>
          <Tider isFooter={true} />
        </Grid>
        <Grid item xs={12} md={4} xl={3} className={classes.item2}>
          <SoMeLinks />
        </Grid>
        <Grid item xs={12} md={4} xl={3} className={classes.item3}>
          <Kontakt />
        </Grid>
      </Grid>
      <Typography align="center" color="primary">
        Copyright © 2020 Studentkulturhuset i Bergen AS (org. nr. 973 199 986
        MVA) - ❤️ fra IT-gruppen
      </Typography>
    </Box>
  )
}

Footer.defaultProps = {
  siteTitle: `Footer`,
}

export default Footer
