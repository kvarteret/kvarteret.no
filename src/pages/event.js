import React from 'react'
import EventPage from '../components/eventPage'
import Layout from '../components/layout';

const Event = ({ props }) => {
  console.log(props)
  return (
    <Layout>
      <EventPage props />
    </Layout>
  )
}

export default Event
