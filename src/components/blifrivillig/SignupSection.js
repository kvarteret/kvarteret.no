import { Typography } from '@material-ui/core'
import React from 'react'
import ExternalContent from '../mainSection/externalContent'

const SignupSection = ({ snippet }) => {
  return (
    <div id="signup">
      <Typography variant="h1" component="h1" color="primary" align="center">
        Meld deg inn i her!
      </Typography>

      <ExternalContent data={snippet} />
    </div>
  )
}

export default SignupSection
