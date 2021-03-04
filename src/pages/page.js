import React from 'react'
import { Grid } from '@material-ui/core'
import Layout from '../components/layout'
import PictureDescription from '../components/pictureDescription'
import PropTypes from 'prop-types'
/**@typedef {import('../components/pictureDescription.js').Room} Room */

/**
 * General component for showing information about a page with it's room
 * @param {Page} props
 */
const Page = (props) => {
  return (
    <Layout spacingTop={true}>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            <h1>{props.title}</h1>
            <p>Stjerne veldig kul</p>
            <p>Alle kom her og spis og drikk og ha det gøy</p>
            <p>
              Vi liker dere veldig godt, men kutt ut philadelphiaosten please
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <PictureDescription
            floor={props.roomInfo.floor}
            capacity={props.roomInfo.floor.capacity}
            bar={props.roomInfo.bar}
            imgUrl={props.roomInfo.imgUrl}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

Page.propTypes = {
  title: PropTypes.string,
  roomInfo: PropTypes.object,
}
Page.defaultProps = {
  title: 'Stjernesalen',
  roomInfo: {
    floor: 12,
    capacity: 100,
    bar: true,
    imgUrl: 'https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg',
  },
}

/**
 * @typedef Page
 * @prop {string} title
 * @prop {Room} roomInfo
 */

export default Page
