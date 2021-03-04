import React from 'react';
import { Grid, Card } from '@material-ui/core';
import Layout from '../components/layout';

const style_image = {
    height: "100%",
    width: "100%"
  };
  
const cafeMenu = () => {
  return(
    <Layout spacingTop={true}>
        <Grid container direction="column">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <img style={style_image} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
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
