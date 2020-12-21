import React from 'react'



import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  title: {
    color: "white"
  },
  divider: {
    backgroundColor: "#707070",
    height: 1,
    marginBottom: 15,
    marginTop: 10
  },
  textTitle: {
    fontSize: 14,
    color: "white"
  },
  text: {
    fontSize: 12,
    color: "#929292"
  }
});


const Kontakt = ({ siteTitle }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h2" className={classes.title}>DET AKADEMISKE KVARTER</Typography>
      <Divider className={classes.divider}></Divider>
      <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" className={classes.textTitle}>BESØKSADDRESSE</Typography>
          <Typography variant="h6" className={classes.text}>OLAV KYRRES GATE</Typography>
          <Typography variant="h6" className={classes.text}>5015 BERGEN</Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="h6" className={classes.textTitle}>POSTADDRESSE</Typography>
          <Typography variant="h6" className={classes.text}>POSTBOKS 1822 HÅKONSGATEN</Typography>
          <Typography variant="h6" className={classes.text}>5086 BERGEN</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}


Kontakt.defaultProps = {
  siteTitle: `Tider`,
}

export default Kontakt