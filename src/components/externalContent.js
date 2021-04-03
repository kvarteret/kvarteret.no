import { withStyles } from '@material-ui/styles'
import React from 'react'

const styles = (theme) => {
  console.log(theme)
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
  console.log(props)
  return (
    <div
      className={props.classes.root}
      dangerouslySetInnerHTML={{ __html: props.data }}
    />
  )
})

export default ExternalContent
