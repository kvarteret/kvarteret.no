import { Box, Container, Grid } from '@material-ui/core'

import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import TopSection from '../components/TopSection'
import Section from '../components/Section'
import GroupSection from '../components/GroupSection';
import FAQSection from '../components/FAQSection';

import {getTranslationsData, TranslationContext } from '../components/TranslatedField'

import styles from '../styles/Index.module.css'
import SignupSection from '../components/SignupSection';
import fetchLayoutData from '../../kvarteret/lib/layout';
import { queryTextsByIds } from '../../kvarteret/lib/queries/text';

const sanitizeData = ({data}) => {
  const translation = data.blifrivillig.translations.at(0);
  return {
    faq: translation.faq,
    formData: translation.signup_form,
    ...data
  }
};

export async function getStaticProps(context) {

  const httpLink = createHttpLink({
    uri: 'https://cms.kvarteret.no/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "ThisIsTestToken";
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const data = sanitizeData(await client.query({
    variables: {lang: context.locale},
    query: gql`
      query BliFrivilligQuery($lang: String) {
        blifrivillig {
          background_video
          top_section {
            image {
              id
            }
            translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              title
              description
            }
          }
          groups {
            status
            blifrivillig_image {
              id
            }
            blifrivillig_group_translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              title
              link
              description
            }
          }
          bottom_section {
            image {
              id
            }
            translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              title
              description
            }
          }
          translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
            group_title
            group_description
            signup_form
            faq {
              title
              text
              status
            }
          }
        }
      }
    `
  }));

  const translations = await getTranslationsData(client, context.locale);

  const layout = await fetchLayoutData(context.locale);

  const texts = await queryTextsByIds(context.locale, ["blifrivillig-meta-title", "blifrivillig-meta-description"]);

  const metadata = {title: texts["blifrivillig-meta-title"], description: texts["blifrivillig-meta-description"]}

  return {
    props: {
      layout,
      metadata,
      data,
      translations
    },
    revalidate: 60,
  }
}

const topSectionItems = (data) => data.blifrivillig.top_section.map((item, key) => {
  const translation = item.translations[0];
  return   <Grid item key={key} className={key % 2 == 1 ? styles.redSection : ''}>
  <Section
    {...(key % 2 == 1 ? { swap: 1 } : { titleColor: 'primary' })}
    image={item.image}
    title={translation.title}
    text={translation.description}
  />
</Grid>
})

const bottomSectionItems = (data) => data.blifrivillig.bottom_section.map((item, key) => {
  const translation = item.translations[0];
  return (
    <Grid item key={key} className={key % 2 == 0 ? styles.redSection : ''}>
      <Section
        {...(key % 2 == 0 ? { swap: 1 } : { titleColor: 'primary' })}
        image={item.image}
        title={translation.title}
        text={translation.description}
      />
    </Grid>
  )
})



export default function Home({data, translations}) {
  return (
      <TranslationContext.Provider value={translations}>
        <Grid container direction="column">
          <Grid item style={{ position: 'relative' }}>
            <TopSection videoUrl={data.video} />
          </Grid>
          {topSectionItems(data)}
          <Grid item style={{ backgroundColor: '#F6F6F6' }}>
            <GroupSection translation={data.blifrivillig.translations.at(0)} groups={data.blifrivillig.groups} />
          </Grid>
          {bottomSectionItems(data)}
          <Grid item>
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
      </TranslationContext.Provider>
  )
}