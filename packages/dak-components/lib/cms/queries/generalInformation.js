import { gql } from "@apollo/client";
import moment from "moment";
import cmsClient from "../cmsClient.ts";

export default async function queryGeneralInformation(lang) {
  const data = await cmsClient.query({
    variables: { lang },
    query: gql`
      query GeneralInformation($lang: String) {
        general_information {
          id
          left_navigation {
            id
          }
          right_navigation {
            id
          }
          hoved_logo {
            id
            __typename
            type
          }
          scripts
          logo {
            id
            __typename
            type
          }
          social_media {
            url
            icon {
              id
              __typename
              type
            }
          }
        }
        navigation {
          id
          is_button
          navigation_item {
            translations(
              filter: { languages_code: { url_code: { _eq: $lang } } }
            ) {
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
              translations(
                filter: { languages_code: { url_code: { _eq: $lang } } }
              ) {
                name
              }
              type
              url
              page_2 {
                slug
              }
            }
            translations(
              filter: { languages_code: { url_code: { _eq: $lang } } }
            ) {
              title
            }
          }
        }
      }
    `,
  });

  return data.data;
}

export async function queryCarouselItems(lang) {
  const data = await cmsClient.query({
    variables: { lang },
    query: gql`
      query queryCarouselItems($lang: String) {
        main_carousel {
          id
          header {
            id
            __typename
            type
          }
          navigation {
            id
            type
            page_2 {
              slug
            }
            url
          }
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            id
            title
            description
          }
        }
      }
    `,
  });

  return data.data.main_carousel;
}

export async function queryTodayText() {
  const data = await cmsClient.query({
    query: gql`
      query QueryTodayText {
        general_information {
          id
          today_at_kvarteret
        }
      }
    `,
  });
  return data?.data?.general_information?.today_at_kvarteret ?? "";
}

export async function queryOpeningHours() {
  const data = await cmsClient.query({
    query: gql`
      query QueryOpeningHours {
        opening_time {
          id
          day
          opening_time_day {
            id
            is_open
            opening_time
            closing_time
            room {
              name
            }
          }
        }
      }
    `,
  });

  const formatTime = (x) => moment(x, "HH:mm:ss").format("HH:mm");
  const result = JSON.parse(JSON.stringify(data.data.opening_time));

  result.forEach((x) =>
    x.opening_time_day?.forEach((y) => {
      y.opening_time = formatTime(y.opening_time);
      y.closing_time = formatTime(y.closing_time);
    })
  );

  return result;
}
