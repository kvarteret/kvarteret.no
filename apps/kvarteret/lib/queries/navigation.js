import { gql } from '@apollo/client';
import cmsClient from "../cmsClient";

export default async function queryNavigationData(lang) {
  const data = 
    await cmsClient.query({
      variables: { lang },
      query: gql`
        query NavigationData($lang: String) {
          navigation_item {
            id
            is_button
            type
            translations(
              filter: { languages_code: { url_code: { _eq: $lang } } }
            ) {
              name
            }
            page {
              id
              slug
            }
            link {
              url
            }
            children {
              id
            }
          }
        }
      `,
    }
  );

  return data.data;
}
