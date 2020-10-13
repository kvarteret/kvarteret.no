import PropTypes from 'prop-types'
import React from 'react'
import q from 'qjuul'

import { Link } from 'gatsby'
import Tider from "./tider.js"
import Kontakt from "./kontakt.js"
import InstaFeed from "./instaFeed.js"


///import './footer.scss'

const Footer = ({ siteTitle }) => {

  return (
    <q.div frbc po='absolute' bo='0px' w100>
      <q.div frbc fsb w100>
        <Kontakt/>
        <Tider/>
        <InstaFeed/>
      </q.div>
    </q.div>
  )
}


Footer.defaultProps = {
  siteTitle: `Footer`,
}

export default Footer