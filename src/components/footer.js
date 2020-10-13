import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'gatsby'
import Tider from "./tider.js"
import Kontakt from "./kontakt.js"
import InstaFeed from "./instaFeed.js"


import './footer.scss'

const Footer = ({ siteTitle }) => {

  return (
    <div>
      <Kontakt/>
      <Tider/>
      <InstaFeed/>
    </div>
  )
}


Footer.defaultProps = {
  siteTitle: `Footer`,
}

export default Footer