import React from 'react'
import { Box, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/layout'
import PictureDescription from '../components/pictureDescription'


const Page = () => {
  
  return(
    <Layout>
        <Grid container direction="column">
            <Grid item xs={12} >
                <PictureDescription />
            </Grid>
            <Grid item xs={12}>
                <h3>Heyehi</h3>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Page
