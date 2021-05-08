import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Divider, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Location } from '@reach/router'

const useStyles = makeStyles({
  languageSize: {
    fontSize: 12,
  },
  languageDivider: {
    height: 16,
    background: '#6B6B6B',
  },
})

function IsEnglish(pathName) {
  return pathName && pathName.startsWith('/en')
}

function getUrl(lang, pathName) {
  pathName = pathName.substring(3)

  if (!pathName.startsWith('/')) pathName = '/' + pathName

  return '/' + lang + pathName
}

function LanguageSelector() {
  const classes = useStyles()
  return (
    <Location>
      {(locationProps) => {
        const eng = IsEnglish(locationProps.location.pathname)
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={1}
            direction="row"
          >
            <Grid item>
              <Link
                to={getUrl('no', locationProps.location.pathname)}
                className={classes.languageSize + (!eng ? ' active' : '')}
              >
                NO
              </Link>
            </Grid>
            <Divider
              orientation="vertical"
              className={classes.languageDivider}
            />
            <Grid item>
              <Link
                to={getUrl('en', locationProps.location.pathname)}
                className={classes.languageSize + (eng ? ' active' : '')}
              >
                EN
              </Link>
            </Grid>
          </Grid>
        )
      }}
    </Location>
  )
}
export default LanguageSelector
