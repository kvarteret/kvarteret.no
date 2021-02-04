import React from 'react'
import { Box, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/layout'
import PictureDescription from '../components/pictureDescription'
import PageInfo from '../components/pageInfo'


const Page = () => {
  
  return(
    <Layout>
        <Grid container direction="column">
            <Grid item xs={12} >
                <PictureDescription />
            </Grid>
            <Grid item xs={12}>
                <PageInfo/>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Page
