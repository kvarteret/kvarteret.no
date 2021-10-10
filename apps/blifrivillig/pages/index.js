import { Grid } from '@material-ui/core'

import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import TopSection from '../components/TopSection'
import Section from '../components/Section'

import {getTranslationsData, TranslationContext } from '../components/TranslatedField'

import styles from '../styles/Index.module.css'

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

  const { data } = await client.query({
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
  });

  const translations = await getTranslationsData(client, context.locale);

  return {
    props: {
      data,
      translations
    },
    revalidate: 60,
  }
}

const TopSectionItems = ({data}) => data.blifrivillig.top_section.map((item, key) => {
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

const BottomSectionItems = ({data}) => data.blifrivillig.bottom_section.map((item, key) => {
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
  console.log("DATA", data)
  return (
      <TranslationContext.Provider value={translations}>
        <Grid container direction="column">
          <Grid item style={{ position: 'relative' }}>
            <TopSection videoUrl={data.video} />
          </Grid>
          <TopSectionItems data={data}/>
          {/* <Grid item style={{ backgroundColor: '#F6F6F6' }}>
            <GroupSection groups={data.groups} />
          </Grid> */}
          <BottomSectionItems data={data} />
          {/* <Grid item>
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
          </Grid> */}
        </Grid>
      </TranslationContext.Provider>
  )
}
