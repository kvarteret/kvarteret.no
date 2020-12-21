/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import q from 'qjuul'

import Header from './header'
import Footer from './footer'

import './layout.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Hegval Display',
    fontSize: 12,
    h2: {
      fontSize: 26
    }
  },
  link: {
    "&:hover": {
      color: "red"
    }
  },
  palette: {
    primary: {main: "#F54B4B"}
  }
});

const Layout = ({ children }) => {
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
      render={data => (
        <ThemeProvider theme={theme}>
          <div style={{backgroundColor: '#FFF' }}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
            <Footer siteTitle={data.site.siteMetadata.title}/>
          </div>
        </ThemeProvider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
