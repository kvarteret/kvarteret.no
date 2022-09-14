import { gql } from "@apollo/client";
import cmsClient from "../cmsClient.ts";
import appendBase64Image from "../utils/appendBase64Image.ts";

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

export async function queryPageSlugById(pageId) {
  const { data } = await cmsClient.query({
    variables: { pageId },
    query: gql`
      query Page_slug_by_id($pageId: ID!) {
        page_by_id(id: $pageId) {
          slug
        }
      }
    `,
  });

  return data?.page_by_id?.slug;
}

export async function queryPageBySlug(lang, slug) {
  const data = await cmsClient.query({
    variables: { lang, slug },
    query: gql`
      query PageDataBySlug($lang: String, $slug: String) {
        page(filter: { slug: { _eq: $slug } }) {
          id
          status
          slug
          page_data(filter: { languages_code: { url_code: { _eq: $lang } } }) {
            title
            description
          }
          translations(filter: { languages_id: { url_code: { _eq: $lang } } }) {
            sections {
              collection
              item {
                ... on call_to_action_section {
                  url
                  text
                }
                ... on rooms_section {
                  room {
                    room_id {
                      floor
                      name
                      gallery {
                        directus_files_id {
                          id
                          __typename
                          type
                          width
                          height
                        }
                      }
                      room_translations(
                        filter: { languages_code: { url_code: { _eq: $lang } } }
                      ) {
                        description
                        tags
                      }
                      page {
                        slug
                      }
                    }
                  }
                }
                ... on text_section {
                  text
                }
                ... on gallery_section {
                  gallery {
                    directus_files_id {
                      id
                      __typename
                      type
                      width
                      height
                    }
                  }
                }
                ... on card_section {
                  layout
                  title
                  cards {
                    image {
                      id
                      __typename
                      type
                    }
                    title
                    text
                  }
                }
                ... on snippet_section {
                  title
                  code
                }
                ... on property_section {
                  id
                  properties
                  style
                }
                ... on split_section {
                  left {
                    collection
                    item {
                      ... on call_to_action_section {
                        url
                        text
                      }
                      ... on rooms_section {
                        room {
                          room_id {
                            floor
                            name
                            gallery {
                              directus_files_id {
                                id
                                __typename
                                type
                                width
                                height
                              }
                            }
                            room_translations(
                              filter: {
                                languages_code: { url_code: { _eq: $lang } }
                              }
                            ) {
                              description
                              tags
                            }
                            page {
                              slug
                            }
                          }
                        }
                      }
                      ... on text_section {
                        text
                      }
                      ... on gallery_section {
                        gallery {
                          id
                          directus_files_id {
                            id
                            __typename
                            type
                            width
                            height
                          }
                        }
                      }
                      ... on snippet_section {
                        title
                        code
                      }
                      ... on property_section {
                        id
                        properties
                        style
                      }
                      ... on card_section {
                        layout
                        title
                        cards {
                          image {
                            id
                            __typename
                            type
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
                      ... on call_to_action_section {
                        url
                        text
                      }
                      ... on rooms_section {
                        room {
                          room_id {
                            floor
                            name
                            gallery {
                              directus_files_id {
                                id
                                __typename
                                type
                                width
                                height
                              }
                            }
                            room_translations(
                              filter: {
                                languages_code: { url_code: { _eq: $lang } }
                              }
                            ) {
                              description
                              tags
                            }
                            page {
                              slug
                            }
                          }
                        }
                      }
                      ... on text_section {
                        text
                      }
                      ... on gallery_section {
                        gallery {
                          directus_files_id {
                            id
                            __typename
                            type
                            width
                            height
                          }
                        }
                      }
                      ... on snippet_section {
                        title
                        code
                      }
                      ... on property_section {
                        id
                        properties
                        style
                      }
                      ... on card_section {
                        layout
                        title
                        cards {
                          image {
                            id
                            __typename
                            type
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

  return await appendBase64Image(data?.data?.page[0]);
}
