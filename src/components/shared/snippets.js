import { Grid } from '@material-ui/core'
import React from 'react'
import DangerouslySetHtmlContent from './DangerousSetHtmlContent'

const Snippet = ({ title, body }) => (
  <Grid item xs={12} style={{ width: '100%' }}>
    <h2>{title}</h2>{' '}
    <DangerouslySetHtmlContent style={{ width: '100%' }} html={body} />
  </Grid>
)

export const Snippets = ({ items }) => {
  items = items || []
  const snippets = items.map((item, id) => (
    <Snippet key={id} title={item.title} body={item.code} />
  ))

  return (
    <Grid container direction="column" spacing={2} alignItems="flex-end">
      {snippets}
    </Grid>
  )
}
