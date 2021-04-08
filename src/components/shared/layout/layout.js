/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

import './layout.css'
import { createMuiTheme, Grid, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import LanguageContext from '../../../providers/languageProvider'
import { darkTheme, lightTheme } from '../../../themes/kvarteretTheme'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'auto',
    width: '100%',
  },
  body: {},
  footer: {
    width: '100%',
  },
})

const Layout = ({ children, spacingTop }) => {
  let spacing = { overflowX: 'hidden' }
  if (spacingTop) spacing = { paddingTop: 80, overflowX: 'hidden' }

  const classes = useStyles()
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <LanguageContext.Provider value={'no'}>
          <ThemeProvider theme={lightTheme}>
            <Grid container direction="column" className={classes.root}>
              <Grid item>
                <Header siteTitle={data.site.siteMetadata.title} />
              </Grid>
              <Grid item className={classes.body} xs>
                <main style={spacing}>{children}</main>
              </Grid>
              <Grid item className={classes.footer}>
                <ThemeProvider theme={darkTheme}>
                  <Footer siteTitle={data.site.siteMetadata.title} />
                </ThemeProvider>
              </Grid>
            </Grid>
          </ThemeProvider>
        </LanguageContext.Provider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
