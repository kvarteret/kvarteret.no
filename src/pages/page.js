import React from 'react'
import { Grid } from '@material-ui/core'
import Layout from '../components/layout'
import PictureDescription from '../components/pictureDescription'
import PropTypes from 'prop-types'
/**@typedef {import('../components/pictureDescription.js').Room} Room */

/**
 * General component for showing information about a page with it's room
 * @param {Page} dataContext
 */
const Page = ({ pageContext }) => {
    return (
        <Layout spacingTop={true}>
            <Grid container direction="row">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div dangerouslySetInnerHTML={{ __html: pageContext.body }} />
                </Grid>
            </Grid>
        </Layout>
    )
}

/**
 * @typedef Page
 * @prop {string} title
 * @prop {Room} roomInfo
 */

export default Page