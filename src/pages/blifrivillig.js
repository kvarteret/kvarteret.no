import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'

import Layout from '../components/shared/layout/layout'

import '../styles/video.css'
import FAQSection, { FAQuestion } from '../components/blifrivillig/FAQSection'
import TopSection from '../components/blifrivillig/TopSection'
import GroupSection from '../components/blifrivillig/GroupSection'
import Section from '../components/blifrivillig/Section'
import SignupSection from '../components/blifrivillig/SignupSection'
import { graphql, useStaticQuery } from 'gatsby'
import { getTranslation } from '../helpers/languageHelper'
import { makeStyles } from '@material-ui/styles'

const Query = graphql`
  query BliFrivilligQuery {
    directus {
      blifrivillig {
        background_video
        top_section {
          image {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 285)
              }
            }
          }
          translations {
            languages_code {
              url_code
            }
            title
            description
          }
        }
        groups {
          image {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 285)
              }
            }
          }
          translations {
            title
            link
            description
            languages_code {
              url_code
            }
          }
        }
        bottom_section {
          image {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 285)
              }
            }
          }
          translations {
            languages_code {
              url_code
            }
            title
            description
          }
        }
        translations {
          signup_form
          languages_code {
            url_code
          }
          faq {
            title
            text
            status
          }
        }
      }
    }
  }
`

const sanitizeSection = (data) => {
  const translation = getTranslation(data.translations)
  return {
    image: data.image.imageFile,
    title: translation.title,
    description: translation.description,
  }
}

const sanitizeGroups = (data) => {
  const translation = getTranslation(data.translations)
  return {
    image: data.image.imageFile,
    title: translation.title,
    description: translation.description,
    link: translation.link,
  }
}

const sanitizeData = (data) => {
  data = data.directus.blifrivillig
  const translation = getTranslation(data.translations)

  return {
    video: data.background_video,
    topSection: data.top_section.map((item) => sanitizeSection(item)),
    bottomSection: data.bottom_section.map((item) => sanitizeSection(item)),
    groups: data.groups.map((item) => sanitizeGroups(item)),
    faq: translation.faq,
    formData: translation.signup_form,
  }
}

const useStyles = makeStyles({
  redSection: {
    backgroundColor: '#F54B4B',
    color: 'white !important',
    h1: {
      color: 'white',
    },
  },
})

const BliFrivillig = () => {
  const styles = useStyles()
  const data = sanitizeData(useStaticQuery(Query))
  console.log(data)

  const topSectionItems = data.topSection.map((item, key) => (
    <Grid item key={key} className={key % 2 == 1 ? styles.redSection : ''}>
      <Section
        {...(key % 2 == 1 ? { swap: 1 } : { titleColor: 'primary' })}
        image={item.image}
        title={item.title}
        text={item.description}
      />
    </Grid>
  ))

  const bottomSectionItems = data.bottomSection.map((item, key) => (
    <Grid item key={key} className={key % 2 == 0 ? styles.redSection : ''}>
      <Section
        {...(key % 2 == 0 ? { swap: 1 } : { titleColor: 'primary' })}
        image={item.image}
        title={item.title}
        text={item.description}
      />
    </Grid>
  ))

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item style={{ position: 'relative' }}>
          <TopSection videoUrl={data.video} />
        </Grid>
        {topSectionItems}
        <Grid item style={{ backgroundColor: '#F6F6F6' }}>
          <GroupSection groups={data.groups} />
        </Grid>
        {bottomSectionItems}
        <Grid item id="signup">
          <Box my={8}>
            <Container fixed>
              <Grid container direction="row" spacing={4} justify="center">
                <Grid item xs={12} md={6}>
                  <FAQSection faq={data.faq} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SignupSection snippet={data.formData} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default BliFrivillig
