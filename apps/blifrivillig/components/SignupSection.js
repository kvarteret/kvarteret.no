import React from 'react'
import ExternalContent from './externalContent'
import TranslatedField from './TranslatedField'

const SignupSection = ({ snippet }) => {
  return (
    <div id="signup">
        <h1 className="primary">
            <TranslatedField tKey="blifrivillig-signup-here" />
        </h1>
      <ExternalContent data={snippet} />
    </div>
  )
}

export default SignupSection
