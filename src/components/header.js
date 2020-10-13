import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import q from 'qjuul'
import { Link } from 'gatsby'

//TODO: gi a element padding sånn at de ser fine ut
const Header = ({ siteTitle }) => {


  return (
    <q.div w100 frtc co="black"  style={{border:"solid 1px red"}}>
      <q.div ma='0px 10px' wi="5vw">
        'burger'
      </q.div>
      <q.div>
        <q.div co="inherit" frtc fsb wi="90vw" style={{borderLeft:"solid 1px red",borderRight:"solid 1px red"}}>
          <q.div wi="45%">
            <Link>Aktuelt</Link>
            <Link>Kafémeny</Link>
            <Link>Butikk</Link>
            <Link>Rombooking</Link>
          </q.div>
          <q.div wi="10%">
            <q.p>
              Bilde
            </q.p>
          </q.div>
          <q.div wi="45%">
            <Link>Bilder</Link>
            <Link>om oss</Link>
            <Link>kontakt</Link>
            <Link>bli frivillig</Link>
          </q.div>
        </q.div>
      </q.div>
      <q.div ma='0px 10px'  wi="5vw">
        'no|eng'
      </q.div>
    </q.div>
  )
}

export default Header
