import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../components/layout';
import PictureDescription from '../components/pictureDescription';
import PageInfo from '../components/pageInfo';


const Page = () => {
  return(
    <Layout spacingTop={true}>
        <Grid container direction="row">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <PageInfo/> 
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <PictureDescription />
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Page;
