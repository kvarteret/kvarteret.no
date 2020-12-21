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

const TodaySection = () => {
    const classes = useStyles();

    const data = [
        {
            eventid: 0,
            floor: 3,
            timespan: "15:00 - 20:00",
            title: "Våpeneksport",
            room: "Storelogen"
        },
        {
            eventid: 1,
            floor: 1,
            timespan: "17:00 - 21:00",
            title: "Amerikansk valgvake",
            room: "Teglverket"
        }
    ]
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    const eventsByFloor = groupBy(data, "floor");
    const components = [];
      for(let i = 3; i >= 1; --i) {
        let floorData = eventsByFloor[i];
        if(floorData) {
            components.push(<Grid item key={i}><Grid container>
                <Typography>
                    {i}. Etasje
                </Typography>
                {/* TODO: Make component function */}
                {floorData.map(x=> (<Grid container direction="row" key={x.eventid}>
                    <Grid item xs={4}> 
                        {x.timespan}
                    </Grid>
                    <Grid item xs={4}> 
                        {x.title}
                    </Grid>
                    <Grid item xs={4}> 
                        {x.room}
                    </Grid>
                </Grid>))}
            </Grid></Grid>)
        }
      }


    return (
        <Grid 
            container
            direction="column"
            spacing={2}
        >
            <Grid item>
                <Typography variant="h4">
                    Dette Skjer i dag
                </Typography>
            </Grid>

            
            {components}
        </Grid>
    );
}

export default TodaySection;