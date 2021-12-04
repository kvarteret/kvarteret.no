import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";

export async function queryIndexEvents(lang, filterDate) {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
    query IndexEventsFiltered($lang: String, $filterDate: String) {
      events(limit: 6, filter: { 
        _or: [
          {
            event_start: {
              _gte: $filterDate
            }
          },
          {
            event_end: {
              _gte: $filterDate
            }
          }
        ]
        }) {
        event_end
        event_start
        top_image {
          id
        }
        room {
          room_id {
            name
          }
        }
        page {
          slug
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

  return data.data.events;
}
