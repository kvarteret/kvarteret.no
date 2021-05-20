import React from 'react'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import DakLogo from '../../images/logo.png'
function SoMeLinks() {
    return (
        <Grid container
            direction="row"
            justify="space-evenly"
        >
            <Grid item>
                <a href="https://www.vg.no">
                    <img src={DakLogo}></img>
                </a>
            </Grid>

            <Grid item>
                <a href="https://www.vg.no">
                    <img src={DakLogo}></img>
                </a>
            </Grid>

            <Grid item>
                <a href="https://www.vg.no">
                    <img src={DakLogo}></img>
                </a>
            </Grid>
        </Grid>
    )
}

export default SoMeLinks
