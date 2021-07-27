import { Typography } from '@material-ui/core'
import React from 'react'
import { getTranslatedText } from '../../helpers/textHelper'
import ExternalContent from '../mainSection/externalContent'

const SignupSection = ({ snippet }) => {
  return (
    <div id="signup">
      <Typography variant="h1" component="h1" color="primary" align="center">
        {getTranslatedText('blifrivillig-signup-here')}
      </Typography>

      <ExternalContent data={snippet} />
    </div>
  )
}

export default SignupSection
