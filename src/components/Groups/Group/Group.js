import React from "react"
import { Box, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'gatsby'


const useStyles = makeStyles({
    title: {
        color: "red",
        position: "relative",
        marginBottom: 20,
    },
    content: {
        margin: "0 3%",
        marginTop: "20px",
        marginBottom: 60,
        marginLeft: 40,
        marginTop: 100,
    },
    img: {
        height: "480px",
        width: "100%",
        objectFit: "cover",
        filter: "brightness(60%)"
    },
    becomeVolunteer: {
		background: "#F54B4B",
		color: "white",
        height: 70,
        marginTop: 30,
        width: 300,
		padding: "0 30px",
		display: "inline-block",
		textAlign: "center",
		lineHeight: "70px",
		"&:hover": {
			background: "#F85B5B",
			color: "white"
		},
		"&:active": {
			background: "#F23B3B",
			color: "white",
		}
	},
    
});

const Group = () =>{
    const classes = useStyles();

    return(
    <Grid container direction="column">
        <Grid item className={classes.content}>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                <Typography variant="h1" className={classes.title}>Vakteaten</Typography>

                <Typography variant="p" className={classes.textBox}>
                Vaktetaten er Kvarterets vaktstyrke, og består av ordensvakter og vektere som har i hovedoppgave å ivareta sikkerheten for gjestene og de som er på jobb. De sørger også for at alle lover og regler overholdes, i tillegg til å ha ansvar for brannsikkerheten. Vaktetaten består også av en gruppe scenevakter. Disse vaktene har som mål å passe på både band og publikum under konsertene. Som en del av Vaktetaten får du tilbud om forskjellige kurs i blant annet konflikthåndtering, førstehjelp og brannsikkerhet. Vaktetaten søker deg som er rolig og behersket, bestemt og rettferdig, ansvarsbevisst og sosial! Som vakt jobber man alltid i team og har jevnlig kontakt med alle som er på jobb, noe som fører til et godt sosialt og sammensveiset miljø både innad i gruppen og sammen med andre frivillige på huset. I tillegg til god erfaring innen konflikthåndtering byr arbeidet på et mangfold av opplevelser og kunnskap som det er nyttig å ha med seg videre. Det er ingen grunn til ikke å ha prøvd seg på denne siden av Bergens uteliv! Gå til www.blifrivillig.no for å melde din interesse. English: The security group at Kvarteret ensures that Kvarteret’s guests and volunteers are safe when they are at Kvarteret. They focus on conflict resolution and the volunteers receive both security training and intern experience. Unfortunately you have to be able to speak Norwegian to be in the security group.
                </Typography>
                <Grid item><Link href="#" className={classes.becomeVolunteer} component="button">Bli med i vakteteaten i dag!</Link></Grid>

                </Grid>
                <Grid item xs={12} lg={6}>
                <img className={classes.img} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
                </Grid>
            </Grid>
        </Grid>

    </Grid>
)}


export default Group