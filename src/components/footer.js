import PropTypes from 'prop-types'
import React from 'react'
import q from 'qjuul'

import { Link } from 'gatsby'
import Tider from "./tider.js"
import Kontakt from "./kontakt.js"
import InstaFeed from "./instaFeed.js"


import './footer.scss'

const Footer = ({ siteTitle }) => {

  return (
    <q.div po='absolute' bo='0px' w100 id="footerComp">         
      <q.p frtc fsb w100>
        <Kontakt/>
        <Tider/>
        <InstaFeed/>
      </q.p>
      <q.p pa="1em" fcbc id="copyright">COPYRIGHT 2020 STUDENTKULTURHUSET I BERGEN AS (ORG NR )</q.p>
    </q.div>
  )
}


Footer.defaultProps = {
  siteTitle: `Footer`,
}

export default Footer