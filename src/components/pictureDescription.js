import React from 'react';
import { Grid } from '@material-ui/core';

const style_image = {
    height: "100%",
    width: "100%"
  };

const PictureDescription = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <img style={style_image} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
            </Grid>
            <Grid item xs={12}> 
                <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item>Etasje: </Grid>
                    <Grid item>Kapasitet: * </Grid>
                    <Grid item>Bar: </Grid>
                </Grid>
            </Grid>
                <Grid item xs={12}>
                    <p>* Kapasitet kan variere</p>
                </Grid>
        </Grid>
        

    )
}

export default PictureDescription;

