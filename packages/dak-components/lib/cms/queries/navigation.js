import { gql } from '@apollo/client';
import cmsClient from "../cmsClient";

export default async function queryNavigationData(lang) {
  const data = 
    await cmsClient.query({
      variables: { lang },
      query: gql`

      query NavigationData($lang: String) {
        navigation {
          id
          is_button
          navigation_item {
            translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              name
            }
            type
            url
            page_2 {
              slug
            }
          }
          muti_menu_dropdown {
            navigation_items {
            translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              name
            }
            type
            url
            page_2 {
              slug
            }
            }
            translations(filter: {languages_code: {url_code: {_eq: $lang}}}) {
              title
            }
          }
        }
      }
      `,
    }
  );

  return data.data;
}
