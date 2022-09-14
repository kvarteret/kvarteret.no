import { gql } from "@apollo/client";
import cmsClient from "../cmsClient.ts";

export async function queryTextsByIds(lang, textIds) {
  const data = await cmsClient.query({
    variables: { lang, textIds },
    query: gql`
      query GetTextsByIds($lang: String, $textIds: [String]) {
        texts(filter: { text_id: { _in: $textIds } }) {
          text_id
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            text
          }
        }
      }
    `,
  });

  const textObj =
    data?.data?.texts?.reduce((acc, text) => {
      acc[text.text_id] = text.translations[0].text;
      return acc;
    }, {}) || {};

  return textObj;
}
