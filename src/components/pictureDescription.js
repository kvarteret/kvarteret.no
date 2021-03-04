import React from 'react'
import { Grid } from '@material-ui/core'

const style_image = {
  height: '100%',
  width: '100%',
}

const PictureDescription = props => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img style={style_image} src="https://i.redd.it/ewix2nyg7ak31.jpg" />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>Etasje: {props.floor}</Grid>
          <Grid item>Kapasitet: {props.capacity}*</Grid>
          <Grid item>Bar: {props.bar}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p>* Kapasitet kan variere</p>
      </Grid>
    </Grid>
  )
}

export default PictureDescription
