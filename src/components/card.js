import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardMedia } from '@material-ui/core';
import { LineWeight } from '@material-ui/icons';
import { Link } from 'gatsby';

const useStyles = makeStyles({
    root: {
        borderRadius: 0,
        boxShadow: "0px 3px 4px rgba(0,0,0,0.16)"
    },
    content: {
        padding: "2px 8px"
    },
    media: {
        marginBottom: 0
    },

    dateText: {
        fontSize: 10,
        margin: 2,
        textTransform: "uppercase"
    },

    title: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 4
    },

    text: {
        fontSize: 12,
        lineHeight: "14px",
        display: "inline-block",
        "& *": {
            margin: 0,
            marginBottom: 4
        }
    }
  });

export default function EventCard({imgSrc, alt, date, title, text, url}) {
    const classes = useStyles();

    const [raised, setRaised] = useState(false);

    return (
        <Link to={url}>
            <Card 
                className={raised ? "" : classes.root} 
                raised={raised}
                onMouseOver={()=>setRaised(true)} 
                onMouseOut={()=>setRaised(false)} 
                >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={imgSrc}
                        title={title}
                        alt={alt}
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            gutterBottom
                            className={classes.dateText}
                        >
                            {date}
                        </Typography>
                        <Typography
                            variant={"h1"}
                            component="h1"
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                        <Typography
                            className={classes.text}
                        >
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
