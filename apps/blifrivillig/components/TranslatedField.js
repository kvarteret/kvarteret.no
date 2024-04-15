import React, { useContext } from "react";
import { gql } from "@apollo/client";

const TranslationContext = React.createContext([]);

const getTranslationsData = async (client, lang) => {
  const { data } = await client.query({
    variables: { lang },
    query: gql`
      query TranslationQuery($lang: String) {
        texts {
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

  return data.texts.reduce((acc, it) => {
    acc[it.text_id] = it.translations[0].text;
    return acc;
  }, {});
};

const TranslatedField = ({ tKey }) => {
  const translations = useContext(TranslationContext);
  const item = translations[tKey];

  if (!item) {
    console.error("Missing translation for key " + tKey);
  }
  return item;
};

export default TranslatedField;
export { getTranslationsData, TranslationContext };
