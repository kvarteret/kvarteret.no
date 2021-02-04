import React from 'react'
import { Box, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/layout'
import PictureDescription from '../components/pictureDescription'
import PageInfo from '../components/pageInfo'


const Page = () => {
  return(
    <Layout>
        <Grid container direction="row">
            <Grid item xs={12} sm={12} md={6} lg={8} xl={9} >
                <PictureDescription />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8} xl={9}>
                <PageInfo/>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Page
