import axios from "axios";
import cache from "memory-cache";
import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { Event, Translation } from "./cms/queries/events";
import { format } from "date-fns-tz";

const cachedGet = async (url: string, headers) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  }

  const cacheTime = 1000 * 60 * 60; //Cached for 1 hour
  const response = await axios.get(url, {
    headers,
    timeout: 2000,
  });
  const data = response.data;
  cache.put(url, data, cacheTime);
  return data;
};

/**
 * Api url for fetching all events hosted or cohosted by Kvarteret which starts today or after today
 */
const studentBergenApiUrl = `https://www.studentbergen.no/api/student_org/11530/events?startTime=>=${format(
  new Date(),
  "yyyy-MM-dd"
)}&limit=100&cohosting=1`;

const getEvents = async (): Promise<Event[]> => {
  // TODO: Place as env variable
  try {
    const studentBergenData = (await cachedGet(studentBergenApiUrl, {
      Authorization: `Bearer ${process.env.STUDENTBERGEN_TOKEN}`,
    })) as StudentBergenEvent[];

    const usedSlugs = {};

    const withSlug = studentBergenData.map((event) => {
      let slug = slugify(event.name, { strict: true, lower: true });
      usedSlugs[slug] = (usedSlugs[slug] || 0) + 1;

      if (usedSlugs[slug] > 1) {
        slug = slug + "-" + (usedSlugs[slug] - 1).toString();
      }

      return { ...event, slug };
    });
    return withSlug.map(externalMapping);
  } catch (error) {
    console.error("Unable to get events from studentBergen", error);
    return [];
  }
};

const getImage = (id?: string | null) => {
  if (!id) {
    return {
      __typename: "directus_files",
      id: "55664499-2abb-4a88-8f92-d46339584061",
    };
  }
  return {
    __typename: "studentBergen",
    id,
  };
};

const externalMapping = (event: StudentBergenEvent): Event => {
  return {
    id: event.id.toString() ?? "",
    status: "published",
    event_start: event.startTime,
    event_end: event.endTime,
    is_recurring: false,
    price: event.price,
    ticket_url: event.ticketsUrl,
    facebook_url: event.facebookUrl,
    // top_image: getImage(event.image?.path),
    // event_header: getImage(event.image?.path),
    top_image: getImage(event.eventBy.image?.path), // This is wrong, as we are interested in the picture of the event, not the organizer
    event_header: getImage(event.eventBy.image?.path), // This is wrong, as we are interested in the picture of the event, not the organizer
    // categories: [event.category, ...event.subCategories], // Categories is not implemented in the API yet
    room: [], // Unsure if it is possible to extract room from studentBergen, it isn't a field there. Might be possible with crescat?
    slug: event.slug ?? event.id.toString(),
    organizer: {
      name: event.eventBy?.name,
    },
    weekly_recurring: [],
    translations: getTranslations(event),
  };
};

function getTranslations(event: StudentBergenEvent) {
  const out: Translation[] = [];

  if (event.name) {
    out.push({
      title: event.name,
      description: event.intro,
      content: sanitizeHtml(event.article),
      practical_information: [],
      snippets: [],
      languages_code: {
        url_code: "no",
      },
    });
  }
  if (event.name_en) {
    out.push({
      title: event.name_en,
      description: event.intro_en,
      content: sanitizeHtml(event.article_en),
      practical_information: [],
      snippets: [],
      languages_code: {
        url_code: "en",
      },
    });
  }

  return out;
}

// TODO: Check if we can query studentBergen for only one event, preferably back in time as well to serve permanent links for old events
// We might have to include the id in the slug in order to query for the id instead of slug
const getEventBySlug = async (slug: string): Promise<Event> => {
  const studentBergenData = (await cachedGet(studentBergenApiUrl, {
    Authorization: `Bearer ${process.env.STUDENTBERGEN_TOKEN}`,
  })) as StudentBergenEvent[];

  const usedSlugs = {};

  const withSlug = studentBergenData.map((event) => {
    let slug = slugify(event.name, { strict: true, lower: true });
    usedSlugs[slug] = (usedSlugs[slug] || 0) + 1;

    if (usedSlugs[slug] > 1) {
      slug = slug + "-" + (usedSlugs[slug] - 1).toString();
    }

    return { ...event, slug };
  });
  // Select first event with same slug
  const event = withSlug
    .filter((event) => event.slug === slug)
    .sort((a, b) =>
      new Date(a.startTime) > new Date(b.startTime) ? 1 : -1
    )[0];
  if (!event) {
    throw Error(`event not found: ${slug}`);
  }
  return externalMapping(event);
};

export { getEvents, getEventBySlug };

export interface StudentBergenEvent {
  id: number;
  slug?: string;
  name: string;
  startTime: Date;
  endTime: Date;
  eventBy: Organizer;
  eventByExtra: Organizer[];
  intro: null | string;
  article: string;
  available_en: boolean;
  name_en: null | string;
  intro_en: null | string;
  article_en: null | string;
  // Following properties is not implemented yet
  price?: null | string;
  ticketsUrl?: null | string;
  facebookUrl?: null | string;
  categories?: null | string[];
}

export interface Organizer {
  id: number;
  name:
    | "Bergen Realistforening"
    | "Det Akademiske Kvarter"
    | "Studentersamfunnet i Bergen"
    | "Studentteateret Immaturus"
    | string;
  image: Image;
  intro: string;
  intro_en: null | string;
  article: string;
  article_en: null | string;
  whoCanJoin: string;
  contactInfo: null | string;
  contactInfo_en: null | string;
  facebookUrl: string;
  instagramUrl: null | string;
  twitterUrl: null | string;
  linkedinUrl: null;
}

export interface Image {
  file: string;
  path: string;
  name: null;
  description: null;
}
