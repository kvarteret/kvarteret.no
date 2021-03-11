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

const About = () =>{
    const classes = useStyles();

    return(
    <Grid container direction="column">
        <Grid item className={classes.content}>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                <Typography variant="h1" className={classes.title}>Om Kvarteret</Typography>

                <Typography variant="p" className={classes.textBox}>
                Det Akademiske Kvarter er studentenes kulturhus i Bergen og din billett til en bedre studiehverdag! Huset drives av et par hundre frivillige som jobber for å gjøre studenttilværelsen i Bergen bedre. Vi er stolte over å tilby et bredt utvalg arrangementer årlig, et godt sosialt arbeidsmiljø og en av Bergens beste atmosfærer. For å gjøre dette jobber vi tett sammen med en rekke arrangører, men spesielt med våre driftsorganisasjoner Aktive Studenters Forening, Bergen Filmklubb, Bergen Realistforening, Studentteateret Immaturus og Studentersamfunnet i Bergen. 
                </Typography>
                <Grid item><Link to="#" className={classes.becomeVolunteer} component="button">Kontak oss i dag!</Link></Grid>

                </Grid>
                <Grid item xs={12} lg={6}>
                <img className={classes.img} src="https://photos.smugmug.com/photos/i-N3ZBZDf/1/X3/i-N3ZBZDf-X3.jpg"/>
                </Grid>
            </Grid>
        </Grid>

    </Grid>
)}


export default About