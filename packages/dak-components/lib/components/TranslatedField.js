import React, { useContext } from "react";
import { gql } from "@apollo/client";
import cmsClient from "../cms/cmsClient.ts";

const TranslationContext = React.createContext([]);

const getTranslationsData = async (lang, fields) => {
  const { data } = await cmsClient.query({
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

  const allFields = [
    ...fields,
    "footer-opening-hours",
    "footer-opening-hours-description",
    "closed",
    "postal-address",
    "visiting-address",
  ];
  const translations = data.texts
    .filter((x) => allFields.includes(x.text_id))
    .reduce((acc, it) => {
      acc[it.text_id] = it.translations[0].text;
      return acc;
    }, {});
  return translations;
};

const useTranslation = (key) => {
  const translations = useContext(TranslationContext);
  if (translations === undefined) {
    console.error(
      "Missing translation for key " +
        key +
        " useContext(TranslationContext) is undefined"
    );
    return key; // default to render key if translations are not loaded
  }
  const item = translations[key];
  if (!item) throw "Missing translation with key " + key;
  return item;
};

const TranslatedField = ({ tKey }) => {
  return useTranslation(tKey);
};

export default TranslatedField;
export { getTranslationsData, TranslationContext, useTranslation };
