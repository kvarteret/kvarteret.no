import { gql } from "@apollo/client";
import moment from "moment";
import cmsClient from "../cmsClient";

export default async function queryGeneralInformation(lang) {
  const data = await cmsClient.query({
    variables: { lang },
    query: gql`
      query GeneralInformation {
        general_information {
          left_navigation {
            id
          }
          right_navigation {
            id
          }
          hoved_logo {
            id
          }
          logo {
            id
          }
          social_media {
            url
            icon {
              id
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
        header {
          id
        }
        navigation {
          type
          page {
            slug
          }
          url
        }
        translations(
          filter: { languages_code: { url_code: { _eq: $lang } } }
        ) {
          title
          description
        }
      }
    }
    `,
  });

  return data.data.main_carousel;
}

export async function queryOpeningHours() {
  const data = await cmsClient.query({
    query: gql`
      query QueryOpeningHours {
        opening_time {
          day
          opening_time_day {
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
