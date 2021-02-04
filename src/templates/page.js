import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import Layout from '../components/layout'

const useStyles = makeStyles({
    root: {
        padding: "20px 3%",
        width: "100%"
    },
});

const NewsPage = ({pageContext}) => {
    const classes=useStyles();
  return(
    <Layout spacingTop={true}>
        <Grid container direction="row" spacing={2} className={classes.root}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h1">{pageContext.title}</Typography>
                <div dangerouslySetInnerHTML={{__html: pageContext.body}}/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <div>TODO: Image</div>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default NewsPage
