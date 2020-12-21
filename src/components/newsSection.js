import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import NewsCard from './newsCard';

import './mainContent.scss'

const useStyles = makeStyles({
    title: {
        marginBottom: 8
    },
    mainContent: {
        backgroundColor: "#F6F6F6",
        margin: 0,
        maxWidth: "100%"
    },
    divider: {
        backgroundColor: "red",
        height: 2,
        marginBottom: 8
    }
});

const NewsSection = () => {
    const classes = useStyles();
    return (
        <Grid 
            container
            direction="column"
        >
            <Grid
                container
                justify="space-between"
                alignItems="flex-end"
                className={classes.title}
            >
                <Typography variant="h3">
                    Nyheter
                </Typography>
                <Typography>
                    Flere nyheter
                </Typography>
            </Grid>
            <Divider orientation="horizontal" flexItem variant="fullWidth" className={classes.divider} />
            <Grid item xs={12}>
                <Grid container spacing={2} className={classes.mainContent}>
                    <Grid item xs={12}>
                        <NewsCard
                            imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png" 
                            alt="Card image"
                            date="3. NOVEMBER | TEGLVERKET | DEBATT"
                            title="Safario // fri alder"
                            text="Den 3. november inviterer Studentersamfunnet i Bergen til Amerikansk Valgvake på Det Akademiske Kvarter!"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <NewsCard
                            imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png" 
                            alt="Card image"
                            date="3. NOVEMBER | TEGLVERKET | DEBATT"
                            title="Safario // fri alder"
                            text="Den 3. november inviterer Studentersamfunnet i Bergen til Amerikansk Valgvake på Det Akademiske Kvarter!"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <NewsCard
                            imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png" 
                            alt="Card image"
                            date="3. NOVEMBER | TEGLVERKET | DEBATT"
                            title="Safario // fri alder"
                            text="Den 3. november inviterer Studentersamfunnet i Bergen til Amerikansk Valgvake på Det Akademiske Kvarter!"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <NewsCard
                            imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png" 
                            alt="Card image"
                            date="3. NOVEMBER | TEGLVERKET | DEBATT"
                            title="Safario // fri alder"
                            text="Den 3. november inviterer Studentersamfunnet i Bergen til Amerikansk Valgvake på Det Akademiske Kvarter!"
                            />
                    </Grid>
                </Grid >
            </Grid>
        </Grid>
    );
}

export default NewsSection;