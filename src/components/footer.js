import PropTypes from 'prop-types'
import React from 'react'
import q from 'qjuul'

import { Link } from 'gatsby'



///import './footer.scss'

const Footer = ({ siteTitle }) => {

  return (
    <q.div frbc po='absolute' bo='0px' w100>
      <q.div frbc fsb w100>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </q.div>
    </q.div>
  )
}


Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer