import React from 'react'
import {  Grid,  Typography ,makeStyles} from '@material-ui/core';
import EventSection from './eventSection';
import './mainContent.scss'
import NewsSection from './newsSection';
import OpeningHoursSection from './openingHoursSection';
import TodaySection from './todaySection';

export default function EventPage() {

    const useStyles = makeStyles({
        root: {
            marginBottom: 60
        },
        img: {
            filter: "blur(4px)",
            height: "480px",
            width: "100%",
            objectFit: "cover",
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
        },
        imgTop:{
            height:"99%",
            position: "absolute", 
            left: 0,
            right: 0,
            margin : "0 auto 0 auto"
        },
    });
    const classes = useStyles();
    const bill={
        a:12,
        b:"emil",
        c:"huset"

    }
    const bodyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including v"
    const img= "https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"
    return (
       <Grid container direction="column" className={classes.root}>
            <Grid item xs={12} className={classes.imgContainer}>
                <img className={classes.img} src={img}/>
                <img className={classes.imgTop} src={img}/>
            </Grid>
            <Grid container alignItems="center" >
                    <Grid container direction="row" justify="space-evenly" alignItems="center" xs={12}>
                        <Typography variant="subtitle" > Sted: {bill.c}</Typography>
                        <Typography variant="subtitle"> Arrangør: {bill.b}</Typography>
                        <Typography variant="subtitle"> Dato: {bill.a}</Typography>
                        <Typography variant="subtitle"> Tid: {bill.a}</Typography>
                        <Typography variant="subtitle"> Pris: {bill.a}</Typography>
                        <Typography variant="subtitle"> Aldersgrense: {bill.a}</Typography>
                    </Grid>
                    <Grid container justify="flex-start" direction="column"
                    alignItems="flex-start" xs={6}>
                        <Typography variant="h3">NAVN ARTIST </Typography>
                        <Typography variant="body2">
                            {bodyText}
                             </Typography>
                        </Grid>
                    <Grid container justify="flex-start" direction="column"
                    alignItems="center" xs={6}>

                    </Grid>
            </Grid>
        </Grid>
    )
}
