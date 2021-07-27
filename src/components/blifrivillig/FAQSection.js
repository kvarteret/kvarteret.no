import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { getTranslatedText } from '../../helpers/textHelper'
import ExternalContent from '../mainSection/externalContent'

export const FAQuestion = ({ title, text }) => {
  return (
    <Box>
      <Typography variant="h3" component="h3" color="primary">
        {title}
      </Typography>
      <Typography>
        <ExternalContent data={text} />
      </Typography>
    </Box>
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
          {getTranslatedText('blifrivillig-faq')}
        </Typography>
      </Grid>
      {faqQuestions}
    </Grid>
  )
}

export default FAQSection
