
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const cmsClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default cmsClient;