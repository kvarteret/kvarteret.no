import PropTypes from 'prop-types'
import React from 'react'
import kvarteretLogo from '../images/logo.png'
import q from 'qjuul'
import { Link } from 'gatsby'
import './header.scss'
import SearchIcon from '@material-ui/icons/Search';

//TODO: gi a element padding sånn at de ser fine ut
const Header = ({ siteTitle }) => {

  const headerHeight = "10vh"
  return (
    <q.div id="daddyHeader" w100 frcc co="black" he={headerHeight}>
      <q.div id="burger" ma='0 auto 0 0' wi="90px" frcc he={headerHeight}>
        'burger'
      </q.div>
      <q.div>
        <q.div id="middleHeader" co="inherit" frcc fsb wi="84vw"he={headerHeight}>
          <q.div wi="40%" he={headerHeight} frcl>
            <SearchIcon id="searchIcon" fontSize="small"/>
            <Link>Aktuelt</Link>
            <Link>Kafémeny</Link>
            <Link>Butikk</Link>
            <Link>Rombooking</Link>
          </q.div>
          <q.div id="logoContainer" wi="10%">
            <img src={kvarteretLogo} id="kvarteretLogo"/>
          </q.div>
          <q.div wi="40%" frcr he={headerHeight}>
            <Link>Bilder</Link>
            <Link>om oss</Link>
            <Link>kontakt</Link>
            <Link>bli frivillig</Link>
          </q.div>
        </q.div>
      </q.div>
      <q.div id="lang" ma='0 0 0 auto'  wi="90px" frcc he={headerHeight}>
        'no|eng'
      </q.div>
    </q.div>
  )
}

export default Header
