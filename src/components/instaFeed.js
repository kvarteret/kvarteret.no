import PropTypes from 'prop-types'
import React from 'react'
import q from 'qjuul'

import { Link } from 'gatsby'



import './footer.scss'
const RomTider =({romNavn, romTid}) =>{
return(
<div>{romNavn} {romTid}</div>
)
}
const InstaFeed = ({ siteTitle }) => {

  return (
    <div>
      <q.div id="header_aapning">Åpningstider</q.div>
      <q.div id="aapent_ved_arrangement">ÅPENT VED ARRANGEMENT</q.div>

    </div>
  )
}


InstaFeed.defaultProps = {
  siteTitle: `Tider`,
}

export default InstaFeed