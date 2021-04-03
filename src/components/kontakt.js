import React from 'react'

import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  divider: {
    backgroundColor: '#707070',
    height: 1,
    marginBottom: 15,
    marginTop: 10,
  },
})

const Kontakt = ({ siteTitle }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant="h3">DET AKADEMISKE KVARTER</Typography>
      <Divider className={classes.divider}></Divider>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={5}>
          <Typography variant="h6">BESØKSADDRESSE</Typography>
          <Typography variant="h6" color="textSecondary">
            OLAV KYRRES GATE
          </Typography>
          <Typography variant="h6" color="textSecondary">
            5015 BERGEN
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="h6">POSTADDRESSE</Typography>
          <Typography variant="h6" color="textSecondary">
            POSTBOKS 1822 HÅKONSGATEN
          </Typography>
          <Typography variant="h6" color="textSecondary">
            5086 BERGEN
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

Kontakt.defaultProps = {
  siteTitle: `Tider`,
}

export default Kontakt
