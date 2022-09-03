import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";
import appendBase64Image from "../utils/appendBase64Image";
import isResourceAvailable from "dak-components/lib/cms/utils/statusUtils";

export default async function queryAllEventSlugs() {
  const { data } = (await cmsClient.query({
    query: gql`
      query QueryAllEventSlugs {
        events {
          id
          status
          slug
        }
      }
    `,
  })) as unknown as { data: { events: EventWithSlug[] } };

  return data.events.filter((x) => x.status === "published");
}

export async function queryAllEvents() {
  const { data } = (await cmsClient.query({
    query: gql`
      query QueryAllEvents() {
        events {
          ${eventGraphQlQueryProps}
        }
      }
    `,
  })) as unknown as { data: { events: Event[] } };

  return data.events.filter((x) => isResourceAvailable(x.status, false));
}

export async function queryEventBySlug(lang: Locale | string, slug: string) {
  const { data } = (await cmsClient.query({
    variables: { slug, lang },
    query: gql`
      query QueryEventById($slug: String) {
        events(filter: { slug: { _eq: $slug } }) {
          ${eventGraphQlQueryProps}
        }
      }
    `,
  })) as unknown as { data: { events: Event[] } };
  return appendBase64Image<Event>(data.events[0]);
}

const getBiggestDate = (a: Date, b: Date) => {
  if (a > b) return a;
  if (a < b) return b;
  return a;
};

const weekdayLookup: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const replaceTime = (date: Date, time: Date) => {
  date.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), 0, 0);
  return date;
};

const spreadRecurringEvents = (events: Event[]) => {
  return events
    .reduce((acc, event) => {
      const eStart = new Date(event.event_start);
      const start = getBiggestDate(new Date(), eStart);
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
    }, [] as Event[])
    .sort((a, b) =>
      new Date(a.event_start) < new Date(b.event_start) ? -1 : 1
    )
    .slice(0, 7);
};

const queryRecurringEventsFiltered = async (lang: Locale, filterDate) => {
  const data = (await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
      query RecurringEventsIndexFiltered($filterDate: String) {
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
          ${eventGraphQlQueryProps}
        }
      }
    `,
  })) as unknown as { data: { events: Event[] } };

  let events = data.data.events;
  const realEvents = spreadRecurringEvents(events);

  return realEvents;
};

export async function queryIndexEvents(lang: Locale, filterDate) {
  const data = (await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
      query IndexEventsFiltered($filterDate: String) {
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
          ${eventGraphQlQueryProps}
        }
      }
    `,
  })) as unknown as { data: { events: Event[] } };

  const recurring = await queryRecurringEventsFiltered(lang, filterDate);
  const regularEvents = data.data.events;

  const events = [...regularEvents, ...recurring].filter((x) =>
    isResourceAvailable(x.status, false)
  );
  return events;
}

export function getCorrectTranslation(
  translations: Translation[],
  lang: Locale
) {
  return (
    translations.find((t) => t.languages_code?.url_code == lang) ??
    translations[0]
  );
}

const eventGraphQlQueryProps = `
id
status
slug
event_start
event_end
is_recurring
weekly_recurring
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
translations {
  title
  description
  content
  practical_information
  snippets {
    title
    code
  }
  languages_code {
    url_code
  }
}
`;

export type EventWithSlug = {
  id: string;
  status: Status | string;
  slug: string;
};

export interface Event {
  id: string;
  status: Status | string;
  slug: string;
  event_start: Date | string;
  event_end: Date | string;
  ticket_url: null | string;
  facebook_url: null | string;
  top_image: Media | null;
  event_header: Media | null;
  room: Room[];
  translations: Translation[];
  is_recurring: boolean;
  weekly_recurring: Weekday[] | null;
  organizer?: null | {
    name: string;
  };
  categories?: { name: string }[];
  price?: string | number;
}

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface Media {
  id: string;
  __typename: "studentBergen" | "directus_files" | string;
  type?: "image/jpeg" | "image/png";
  /**Added in AppendBase64Image */
  base64?: string;
}

export interface Room {
  room_id: RoomID | null;
}

export interface RoomID {
  name: string;
  floor: string;
}

export enum Status {
  Published = "published",
  Draft = "draft",
  Archived = "archived",
}

export interface Translation {
  title: string | null;
  description: null | string;
  content: string | null;
  practical_information: PracticalInformation[] | null;
  snippets: any[];
  languages_code?: {
    url_code: Locale;
  };
}

export interface PracticalInformation {
  /** Icon that should be accessible from the icon pack */
  icon: "dak-alert" | "dak-group" | "dak-price" | "dak-ticket" | string;
  text: string;
  title: string;
}

export type Locale = "en" | "no";
