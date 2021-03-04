/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import q from 'qjuul'

import Header from './header'
import Footer from './footer'

import './layout.css'
import { createMuiTheme, Grid, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Sidedrawer from '../components/SideDrawer/Sidedrawer'
import LanguageContext from '../providers/languageProvider'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Hegval Display',
    fontSize: 12,
    h1: {
      fontSize: 60,
    },
    h2: {
      fontSize: 26,
    },
  },
  link: {
    '&:hover': {
      color: '#F54B4B;',
    },
  },
  palette: {
    primary: { main: '#F54B4B' },
  },
})

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    position: 'relative',
  },
  body: {
    paddingBottom: '387px',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '387px',
  },
})

const Layout = ({ children, spacingTop }) => {
  const [isOpen, setDrawerState] = useState(false)

  let spacing = {}
  if (spacingTop) spacing = { paddingTop: 80 }

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
          {/* <Sidedrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}
          <ThemeProvider theme={theme}>
            <Grid container direction="column" className={classes.root}>
              <Grid item>
                <Header siteTitle={data.site.siteMetadata.title} />
              </Grid>
              <Grid item className={classes.body}>
                <main style={spacing}>{children}</main>
              </Grid>
              <Grid item className={classes.footer}>
                <Footer siteTitle={data.site.siteMetadata.title} />
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
