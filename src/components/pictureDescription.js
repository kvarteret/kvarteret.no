import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

const style_image = {
  height: '100%',
  width: '100%',
}

/**
 * Room description with image
 * @param {Room} props
 */
const PictureDescription = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img style={style_image} src={props.imgUrl} />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>Etasje: {props.floor}</Grid>
          <Grid item>Kapasitet: {props.capacity}</Grid>
          <Grid item>Bar: {props.bar ? 'ja' : 'nei'}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p>* Kapasitet kan variere</p>
      </Grid>
    </Grid>
  )
}

PictureDescription.propTypes = {
  floor: PropTypes.number.isRequired,
  capacity: PropTypes.number,
  bar: PropTypes.bool,
  imgUrl: PropTypes.string,
}

export default PictureDescription

/**
 * @typedef Room
 * @prop {number} floor
 * @prop {number} capacity
 * @prop {boolean} bar
 * @prop {string} imgUrl
 */
