import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import q from 'qjuul'
import { Link } from 'gatsby'


const Header = ({ siteTitle }) => {


  return (
    <q.div w100 frtc co="black">
      <q.div ma='0px 10px' wi="5vw">
        'burger'
      </q.div>
      <q.div>
        <q.div co="inherit" frtc fsb wi="90vw">
          <q.div wi="45%">
            <Link>Aktuelt</Link>
            <Link>Kafémeny</Link>
            <Link>Butikk</Link>
            <Link>Rombooking</Link>
          </q.div>
          <q.div wi="10%">
            Bilde
          </q.div>
          <q.div wi="45%">
            <Link>Bilder</Link>
            <Link>om oss</Link>
            <Link>kontakt</Link>
            <Link>bli frivillig</Link>
          </q.div>
        </q.div>
      </q.div>
      <q.div ma='0px 10px' wi="5vw">
        'no|eng'
      </q.div>
    </q.div>
  )
}

export default Header
