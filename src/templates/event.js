import { useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import EventPage from '../components/eventPage'
import Layout from '../components/shared/layout/layout'

const Event = ({ pageContext }) => {
  const theme = useTheme()
  const spacingTop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Layout spacingTop={!spacingTop}>
      <EventPage dataContext={pageContext} />
    </Layout>
  )
}

export default Event
