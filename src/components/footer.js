import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'gatsby'



import './footer.scss'

const Footer = ({ siteTitle }) => {

  return (
    <div style={{ 
        alignSelf: 'stretch', 
        height:"10vw", 
        backgroundColor:"Gray",
        }}>
      
    </div>
  )
}


Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer