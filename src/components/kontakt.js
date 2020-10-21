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



const ColoredLine = () => (
  <hr
      style={{
          color: "#393939",
          backgroundColor: "#393939",
          height: .5
        
      }}
  />
);

const Kontakt = ({ siteTitle }) => {

  return (
    <div>
      <q.div id="header_tittel">Det Akademiske Kvarter</q.div>
      <ColoredLine/>

      <q.div id="header_tittel_undertittel">Besøksadresse</q.div>
      <q.div id="header_content">OLAV KYRRES GATE 49</q.div>
      <q.div id="header_content">5015 BERGEN</q.div>
<br></br>
      <q.div id="header_tittel_undertittel">Postadresse</q.div>
      <q.div id="header_content">Postboks 1822 Håkonsgaten</q.div>
      <q.div id="header_content">5866 Bergen</q.div>


    </div>
  )
}


Kontakt.defaultProps = {
  siteTitle: `Tider`,
}

export default Kontakt