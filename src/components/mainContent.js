import { Box, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EventCard from './card';
import EventSection from './eventSection';

import './mainContent.scss'
import NewsCard from './newsCard';
import NewsSection from './newsSection';
import OpeningHoursSection from './openingHoursSection';
import TodaySection from './todaySection';
import EventPage from './eventPage';

const useStyles = makeStyles({
    root: {
        marginBottom: 60
    },
    img: {
        height: "480px",
        width: "100%",
        objectFit: "cover",
        filter: "brightness(60%)"
    },
    content: {
        margin: "0 3%",
        marginTop: "20px"
    },
    imgContainer: {
        position: "relative"
    },
    imgText: {
        position: "absolute",
        bottom: "30px",
        left: "3%",
        color: "white",
        fontSize: 30,
        "@media (min-width:600px)": {
            fontSize: 50,
        },
        "@media (min-width:960px)": {
            fontSize: 80,
        }
    }
});

const MainContent = ({content}) => {
    const classes = useStyles();
    return (
        <div>
{/*         <EventPage/>
 */}        <Grid container direction="column" className={classes.root}>
            <Grid item xs={12} className={classes.imgContainer}>
                <img className={classes.img} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
                <Typography variant="h1" className={classes.imgText}>Minner fra Datarock</Typography>
            </Grid>
            <Grid item className={classes.content}>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={6} lg={8} xl={9}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={8}>
                                <TodaySection/>
                            </Grid>
                            <Grid item xs={12} md= {12} lg={4}>
                                <OpeningHoursSection/>
                            </Grid>
                            <Grid item xs={12}>
                                <EventSection/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} xl={3}>
                        <NewsSection/>
                    </Grid>            
                </Grid>
            </Grid>
        </Grid>
        </div>

        );
        
}

export default MainContent;
/* 
<Grid container direction="column" className={classes.root}>
            <Grid item xs={12} className={classes.imgContainer}>
                <img className={classes.img} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
                <Typography variant="h1" className={classes.imgText}>Minner fra Datarock</Typography>
            </Grid>
            <Grid item className={classes.content}>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={6} lg={8} xl={9}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={8}>
                                <TodaySection/>
                            </Grid>
                            <Grid item xs={12} md= {12} lg={4}>
                                <OpeningHoursSection/>
                            </Grid>
                            <Grid item xs={12}>
                                <EventSection/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} xl={3}>
                        <NewsSection/>
                    </Grid>            
                </Grid>
            </Grid>
        </Grid> */