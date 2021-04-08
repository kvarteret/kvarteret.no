import React from 'react'
import EventPage from '../components/eventPage'
import Layout from '../components/layout';

const Event = ({ pageContext }) => {
  return (
    <Layout>
      <EventPage dataContext={pageContext} />
    </Layout>
  )
}

export default Event
