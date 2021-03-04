import React from 'react';
import { Grid, Card } from '@material-ui/core';
import Layout from '../components/layout';

const style_image = {
    height: "90%",
    width: "90%"
  };

const cafeMenu = () => {
  return(
    <Layout spacingTop={true}>
        <Grid container direction="column">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <img src="https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg"/>
                <h1>KAFEMENY</h1>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                MAIN MENU
            </Grid>
        </Grid>
    </Layout>
  )
}

export default cafeMenu;
