import getDirectusClient from "./get-directus-client";

export async function getEventsAfter(lang: Locale, date = new Date()) {
  const upcomingEventsCmsPromise = queryAllEvents(date);
  //   const upcomingEventsBergenPromise = getUpcomingEventsFromStudentBergen(date); // TODO: Implement getUpcomingEventsFromStudentBergen
  const upcomingEventsBergenPromise = [] as Event[];

  const [upcomingEventsCms, upcomingEventsBergen] = await Promise.all([
    upcomingEventsCmsPromise,
    upcomingEventsBergenPromise,
  ]);

  return upcomingEventsCms
    .concat(upcomingEventsBergen)
    .sort((a, b) =>
      new Date(a.event_start) > new Date(b.event_start) ? 1 : -1,
    );
}

export async function queryAllEventSlugs() {
  const data = await getDirectusClient().query<{ events: EventWithSlug[] }>(`
  query QueryAllEventSlugs {
    events {
      id
      status
      slug
    }
  }
`);

  return data.events.filter((x) => x.status === "published");
}

export async function queryAllEvents(filterDate = new Date()) {
  // Subtract 6 hours to include events around today
  filterDate.setHours(filterDate.getHours() - 6);
  const data = await getDirectusClient().query<{ events: Event[] }>(
    `
  query QueryAllEvents($filterDate: String) {
    events (
      sort: "event_start"
      filter: {
        event_start: { _gte: $filterDate }
      }
    ) {
      ${eventGraphQlQueryProps}
  }
}
`,
    {
      filterDate: filterDate.toISOString(),
    },
  );

  return data.events.filter((x) => isResourceAvailable(x.status, false));
}

export function queryEventBySlug(lang: Locale, slug: string) {
  return getDirectusClient().query<{ events: Event[] }>(
    `
  query QueryEventById($slug: String) {
    events(filter: { slug: { _eq: $slug } }) {
      ${eventGraphQlQueryProps}
    }
  }
`,
    {
      slug,
      lang,
    },
  );
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
      const end = new Date(event.event_end ?? new Date());

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const nD = new Date(d);
        const weekday = weekdayLookup[new Date(nD).getDay()];
        if (!event.weekly_recurring?.includes(weekday)) continue;
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
      new Date(a.event_start) < new Date(b.event_start) ? -1 : 1,
    )
    .slice(0, 7);
};

const queryRecurringEventsFiltered = async (
  lang: Locale,
  filterDate = new Date(),
) => {
  const data = await getDirectusClient().query<{ events: Event[] }>(
    `
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
    {
      lang,
      filterDate,
    },
  );

  return spreadRecurringEvents(data.events);
};

export async function queryIndexEvents(lang: Locale, filterDate: Date) {
  const data = await getDirectusClient().query<{ events: Event[] }>(
    `
    query IndexEventsFiltered($filterDate: String) {
      events(
        limit: 6
        sort: "event_start"
        filter: {
          _or: [
            {
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
            {
              _and: [
                { event_end: { _gte: $filterDate } }
                { is_recurring: { _eq: true } }
              ]
            }
          ]
        }
      ) {
        ${eventGraphQlQueryProps}
      }
    }
  `,
    {
      lang,
      filterDate,
    },
  );

  const recurring = spreadRecurringEvents(
    data.events.filter((event) => event.is_recurring),
  );
  const regularEvents = data.events.filter((event) => !event.is_recurring);

  const events = [...regularEvents, ...recurring].filter((x) =>
    isResourceAvailable(x.status, false),
  );
  return events;
}

export function getCorrectTranslation(
  translations: Translation[],
  lang: Locale,
) {
  return (
    translations.find((t) => t.languages_code?.url_code == lang) ??
    translations[0]
  );
}

export function isResourceAvailable(
  status: Status | string,
  isPreview: boolean,
) {
  if (isPreview) return true;
  if (status === Status.Published) return true;

  return false;
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
  event_end?: Date | string;
  ticket_url?: null | string;
  facebook_url?: null | string;
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
  price?: string | null | number;
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
