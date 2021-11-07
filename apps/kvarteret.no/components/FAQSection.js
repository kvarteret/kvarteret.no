import React from 'react'
import TranslatedField from './TranslatedField'
import ExternalContent from './ExternalContent'
import { Box, Container, Grid, Typography } from '@material-ui/core'

export const FAQuestion = ({ title, text }) => {
  return (
    <div>
      <Typography variant="h3" component="h3" color="primary">
            {title}
      </Typography>
      <Typography>
        <ExternalContent data={text} />
      </Typography>
    </div>
  )
}

const FAQSection = ({ faq }) => {
  const faqQuestions = faq.map((item, key) => (
    <Grid item key={key}>
      <FAQuestion title={item.title} text={item.text}></FAQuestion>
    </Grid>
  ))

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h1" component="h1" color="primary">
            <TranslatedField tKey="blifrivillig-faq" />
        </Typography>
      </Grid>
      {faqQuestions}
    </Grid>
  )
}

export default FAQSection
