import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";
import appendBase64Image from "../utils/appendBase64Image";
import isResourceAvailable from "dak-components/lib/cms/utils/statusUtils";

export default async function queryAllEventSlugs() {
  const { data } = await cmsClient.query({
    query: gql`
      query QueryAllEventSlugs {
        events {
          id
          status
          slug
        }
      }
    `,
  });

  return data.events.filter((x) => x.status === "published");
}

export async function queryAllEvents() {
  const { data } = await cmsClient.query({
    variables: { lang: "no" },
    query: gql`
      query QueryAllEvents($lang: String) {
        events {
          status
          id
          event_end
          event_start
          ticket_url
          facebook_url
          slug
          top_image {
            id
            __typename
            type
          }
          event_header {
            id
            __typename
            type
          }
          room {
            room_id {
              name
              floor
            }
          }
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            title
            description
            content
            practical_information
            snippets {
              title
              code
            }
          }
        }
      }
    `,
  });

  return data.events.filter((x) => isResourceAvailable(x.status, false));
}

export async function queryEventBySlug(lang, slug) {
  const { data } = await cmsClient.query({
    variables: { slug, lang },
    query: gql`
      query QueryEventById($slug: String, $lang: String) {
        events(filter: { slug: { _eq: $slug } }) {
          status
          id
          event_end
          event_start
          ticket_url
          facebook_url
          top_image {
            id
            __typename
            type
          }
          event_header {
            id
            __typename
            type
          }
          room {
            room_id {
              name
              floor
            }
          }
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            title
            description
            content
            practical_information
            snippets {
              title
              code
            }
          }
        }
      }
    `,
  });
  return await appendBase64Image(data.events[0]);
}

const getBiggest = (a, b) => {
  if (a > b) return a;
  if (a < b) return b;
  return a;
};

const weekdayLookup = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const replaceTime = (date, time) => {
  date.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), 0, 0);
  return date;
};

const spreadRecurringEvents = (events) => {
  return events
    .reduce((acc, event) => {
      const eStart = new Date(event.event_start);
      const start = getBiggest(new Date(), eStart);
      replaceTime(start, eStart);
      const end = new Date(event.event_end);

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const nD = new Date(d);
        const weekday = weekdayLookup[new Date(nD).getDay()];
        if (!event.weekly_recurring.includes(weekday)) continue;
        const realStart = nD;
        const realEnd = replaceTime(new Date(nD), end);

        if (realStart > realEnd) {
          realEnd.setDate(realEnd.getDate() + 1);
        }

        acc.push({
          ...event,
          event_start: realStart.toISOString(),
          event_end: realEnd.toISOString(),
        });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.event_start) - new Date(b.event_start))
    .slice(0, 7);
};

const queryRecurringEventsFiltered = async (lang, filterDate) => {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
      query RecurringEventsIndexFiltered($lang: String, $filterDate: String) {
        events(
          limit: 6
          sort: "event_start"
          filter: {
            _and: [
              { event_end: { _gte: $filterDate } }
              { is_recurring: { _eq: true } }
            ]
          }
        ) {
          status
          event_end
          event_start
          is_recurring
          top_image {
            id
            __typename
            type
          }
          room {
            room_id {
              name
              floor
            }
          }
          slug
          weekly_recurring
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            title
            description
            content
          }
        }
      }
    `,
  });

  let events = data.data.events;
  const realEvents = spreadRecurringEvents(events);

  return realEvents;
};

export async function queryIndexEvents(lang, filterDate) {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
      query IndexEventsFiltered($lang: String, $filterDate: String) {
        events(
          limit: 6
          sort: "event_start"
          filter: {
            _and: [
              {
                _or: [
                  { event_start: { _gte: $filterDate } }
                  { event_end: { _gte: $filterDate } }
                ]
              }
              { is_recurring: { _eq: false } }
            ]
          }
        ) {
          status
          event_end
          event_start
          is_recurring
          top_image {
            id
            __typename
            type
          }
          room {
            room_id {
              name
              floor
            }
          }
          slug
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

  const recurring = await queryRecurringEventsFiltered(lang, filterDate);
  const regularEvents = data.data.events;

  const events = [...regularEvents, ...recurring].filter((x) =>
    isResourceAvailable(x.status, false)
  );
  return events;
}
