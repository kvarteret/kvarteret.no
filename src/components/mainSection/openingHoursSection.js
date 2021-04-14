import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EventCard from './card';
import EventSection from './eventSection';

import './mainContent.scss'

const useStyles = makeStyles({
    title: {
        marginBottom: 8
    },
    mainContent: {
        backgroundColor: "#F6F6F6",
        margin: 0,
    },
    divider: {
        backgroundColor: "red",
        height: 2,
        marginBottom: 8
    }
});

const OpeningHoursSection = () => {
    const classes = useStyles();

    const data = [
        {
            roomId: 0,
            floor: 3,
            name: "Stjernesalen",
            timespan: "12:30 - 00:00"
        },
        {
            roomId: 1,
            floor: 1,
            name: "Grøndahls",
            timespan: "19:30 - 00:00"
        }
    ]

    const components = data.map(x=> (<Grid container direction="row" key={x.roomId}>
        <Grid item xs={6}> 
            {x.name}
        </Grid>
        <Grid item xs={6}> 
            {x.timespan}
        </Grid>
    </Grid>));


    return (
        <Grid 
            container
            direction="column"
            spacing={2}
        >
            <Grid item>
                <Typography variant="h4">
                    Åpningstider
                </Typography>
            </Grid>

            <Grid item>
                {components}
            </Grid>
        </Grid>
    );
}

export default OpeningHoursSection;