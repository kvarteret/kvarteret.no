

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
        general_information {
          date_created
          left_navigation {
            id
            internal_name
          }
          right_navigation {
            id
            internal_name
          }
          logo {
            id
          }
          hoved_logo {
            id
          }
        }
        navigation_item {
          id
          is_button
          internal_name
          translations {
            languages_code {
              name
            }
          }
          type
          children {
            id
          }
          link {
            url
          }
          page {
            slug
            status
          }
        }
      }
    `
  }));

  const translations = await getTranslationsData(client, context.locale);
  return {
    props: {
      data,
      translations
    },
    revalidate: 60,
  }
}

export default function Index() {
  return (
    
  )
}