import React from 'react'
import DangerouslySetHtmlContent from './DangerousSetHtmlContent'

const ExternalContent = (props) => {
  return (
    <DangerouslySetHtmlContent
      html={props.data}
    />
  )
}

export default ExternalContent
