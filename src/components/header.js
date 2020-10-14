import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import q from 'qjuul'
import { Link } from 'gatsby'
import './header.scss'

//TODO: gi a element padding sånn at de ser fine ut
const Header = ({ siteTitle }) => {


  return (
    <q.div w100 frcc co="black" >
      <q.div ma='0px 20px' wi="5vw">
        'burger'
      </q.div>
      <q.div>
        <q.div id="middleHeader" co="inherit" frcc fsb wi="90vw">
          <q.div wi="45%">
            <Link>Aktuelt</Link>
            <Link>Kafémeny</Link>
            <Link>Butikk</Link>
            <Link>Rombooking</Link>
          </q.div>
          <q.div wi="10%" frcc>
            <q.p>
              Bilde
            </q.p>
          </q.div>
          <q.div wi="45%" frcr>
            <Link>Bilder</Link>
            <Link>om oss</Link>
            <Link>kontakt</Link>
            <Link>bli frivillig</Link>
          </q.div>
        </q.div>
      </q.div>
      <q.div ma='0px 30px'  wi="5vw">
        'no|eng'
      </q.div>
    </q.div>
  )
}

export default Header
