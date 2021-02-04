import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import NewsCard from './newsCard';

import './mainContent.scss'
import { graphql, useStaticQuery } from 'gatsby';

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

    const data = useStaticQuery(graphql`
        query NewsSectionQuery {
            directus {
            items {
                news {
                date_created
                date_updated
                id
                slug
                status
                translations {
                    tagline
                    title
                }
                }
            }
            }
        }      
    `);
    const newsItems = data.directus.items.news.filter(x=>x.status == "published").map(x => (
        <Grid item xs={12} key={x.id}>
            <NewsCard
                imgSrc="https://kvarteret.no/wp-content/uploads/2020/10/V%C3%A5peneksport-1024x536.png" 
                alt={x.title}
                date={x.date_updated || x.date_created}
                title={x.translations[0].title}
                text={x.translations[0].tagline}
                url={"/news/" + x.slug}
                />
        </Grid>
    ));

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
                    {newsItems}
                </Grid >
            </Grid>
        </Grid>
    );
}

export default NewsSection;