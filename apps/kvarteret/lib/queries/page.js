import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";

export default async function queryAllPageSlugs() {
  const { data } = await cmsClient.query({
    query: gql`
      query AllPageSlugs {
        page {
          status
          id
          metadata {
            slug
          }
        }
      }
    `,
  });

  return data.page;
}

export async function queryPageBySlug(lang, slug) {
  const data = await cmsClient.query({
    variables: { lang, slug },
    query: gql`query PageDataBySlug($lang: String, $slug: String) {
      page(filter: { metadata: { slug: { _eq: $slug } } }) {
        id
        status
        metadata {
          slug
          translations(filter: { languages_code: { url_code: { _eq: $lang } } }) {
            title
            description
          }
        }
        translations(filter: { languages_id: { url_code: { _eq: $lang } } }) {
          sections {
            collection
            item {
              ... on text_section {
                text
              }
              ... on gallery_section {
                gallery {
                  directus_files_id {
                    id
                  }
                }
              }
              ... on card_section {
                title
                cards {
                  image {
                    id
                  }
                  title
                  text
                }
              }
              ... on snippet_section {
                code
              }
              ... on split_section {
                left {
                  collection
                  item {
                    ... on text_section {
                      text
                    }
                    ... on gallery_section {
                      gallery {
                        id
                      }
                    }
                    ... on snippet_section {
                      code
                    }
                    ... on card_section {
                      title
                      cards {
                        image {
                          id
                        }
                        title
                        text
                      }
                    }
                  }
                }
                right {
                  collection
                  item {
                    ... on text_section {
                      text
                    }
                    ... on gallery_section {
                      gallery {
                        directus_files_id {
                          id
                        }
                      }
                    }
                    ... on snippet_section {
                      code
                    }
                    ... on card_section {
                      title
                      cards {
                        image {
                          id
                        }
                        title
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    
    `,
  });

  return data?.data?.page[0];
}
