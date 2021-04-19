import { withStyles } from '@material-ui/styles'
import React from 'react'
import DangerouslySetHtmlContent from '../shared/DangerousSetHtmlContent'

const styles = (theme) => {
  return {
    root: {
      '& h1': {
        color: theme.palette.primary.main,
        ...theme.typography.h1,
      },
      '& h2': {
        color: theme.palette.primary.main,
        ...theme.typography.h2,
      },
      '& h3': {
        color: theme.palette.primary.main,
        ...theme.typography.h3,
      },
    },
  }
}
const ExternalContent = withStyles(styles)((props) => {
  return (
    <DangerouslySetHtmlContent
      className={props.classes.root}
      html={props.data}
    />
  )
})

export default ExternalContent
