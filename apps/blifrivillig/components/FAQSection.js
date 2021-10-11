import React from 'react'
import TranslatedField from './TranslatedField'
import ExternalContent from './ExternalContent'
import Grid from './Grid'

export const FAQuestion = ({ title, text }) => {
  return (
    <div>
        <h3 className="primary">
            {title}
        </h3>
        <ExternalContent data={text} />
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
        <h1 className="primary">
            <TranslatedField tKey="blifrivillig-faq" />
        </h1>
      </Grid>
      {faqQuestions}
    </Grid>
  )
}

export default FAQSection
