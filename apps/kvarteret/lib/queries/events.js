import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";

export async function queryIndexEvents(lang, filterDate) {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
      query IndexEventsFiltered($lang: String, $filterDate: String) {
        events(limit: 6, filter: { event_end: { _gte: $filterDate } }) {
          internal_name
          event_end
          event_start
          top_image {
            id
          }
          event_room {
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
