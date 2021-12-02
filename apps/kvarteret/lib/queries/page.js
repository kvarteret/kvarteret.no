import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";

export default async function queryAllPageSlugs() {
  const { data } = await cmsClient.query({
    query: gql`
      query AllPageSlugs {
        page {
          status
          id
          slug
        }
      }
    `,
  });

  return data.page;
}

export async function queryPageBySlug(lang, slug) {
  const data = await cmsClient.query({
    variables: { lang, slug },
    query: gql`

    query PageDataBySlug($lang: String, $slug: String) {
      page(filter: {slug: {_eq: $slug}}) {
        id
        status
        slug
        translations(filter: {languages_id: {url_code: {_eq: $lang}}}) {
          title
          description
          content
          snippets {
            code
            title
          }
        }
        gallery {
          directus_files_id {
            id
          }
        }
      }
    }
    `,
  });

  return data?.data?.page[0];
}
