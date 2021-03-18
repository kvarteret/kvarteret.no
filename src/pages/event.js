import React from 'react'
import EventPage from '../components/eventPage'
import Layout from '../components/layout';

const Event = (props) => {
  console.log(props.pathContext)
  return (
    <Layout>
      <EventPage props={props.pathContext} />
    </Layout>
  )
}

export default Event
