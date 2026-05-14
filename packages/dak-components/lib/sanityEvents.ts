import { Event, Translation } from "./cms/queries/events";

const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "mkjoahvv";
const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const SANITY_API_VERSION = "2024-01-01";

type SanityDate = {
  _key?: string;
  startDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
};

type SanityArrangement = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  approvalStatus?: string | null;
  isRecurring?: boolean | null;
  rrule?: string | null;
  dates?: SanityDate[] | null;
  isFree?: boolean | null;
  priceOrdinar?: number | null;
  priceStudent?: number | null;
  priceMedlem?: number | null;
  ticketUrl?: string | null;
  facebookUrl?: string | null;
  imageUrl?: string | null;
  imageCaption?: string | null;
  room?: {
    _id?: string | null;
    title?: string | null;
    slug?: string | null;
    floor?: number | null;
  } | null;
  roomText?: string | null;
  organizerGroup?: {
    _id?: string | null;
    name?: string | null;
    slug?: string | null;
  } | null;
  organizerText?: string | null;
  eventType?: {
    _id?: string | null;
    name?: string | null;
    slug?: string | null;
    taxonomyGroup?: {
      name?: string | null;
      slug?: string | null;
    } | null;
  } | null;
  description?: PortableTextBlock[] | null;
};

type PortableTextBlock = {
  _type?: string;
  style?: string;
  children?: { text?: string | null }[];
};

const arrangementProjection = `{
  _id,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  approvalStatus,
  isRecurring,
  rrule,
  "dates": dates | order(startDate asc) {
    _key,
    "startDate": coalesce(startDate, ""),
    startTime,
    endTime
  },
  isFree,
  priceOrdinar,
  priceStudent,
  priceMedlem,
  ticketUrl,
  facebookUrl,
  "imageUrl": image.asset->url,
  imageCaption,
  "room": room-> {
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    floor
  },
  roomText,
  "organizerGroup": organizerGroup-> {
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, "")
  },
  organizerText,
  "eventType": eventType-> {
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    "taxonomyGroup": taxonomyGroup-> {
      "name": coalesce(name, ""),
      "slug": coalesce(slug.current, "")
    }
  },
  description[] {
    ...,
    children[] { ..., text }
  }
}`;

const publishedArrangementsQuery = `*[
  _type == "arrangement"
  && approvalStatus == "approved"
  && (
    count(dates[startDate >= $today]) > 0
    || (isRecurring == true && defined(rrule) && count(dates) > 0)
  )
] | order(coalesce(dates[startDate >= $today][0].startDate, dates[0].startDate) asc) ${arrangementProjection}`;

const arrangementBySlugQuery = `*[
  _type == "arrangement"
  && slug.current == $slug
  && approvalStatus == "approved"
][0] ${arrangementProjection}`;

const arrangementSlugsQuery = `*[
  _type == "arrangement"
  && approvalStatus == "approved"
  && defined(slug.current)
].slug.current`;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const portableTextToHtml = (blocks: PortableTextBlock[] | null | undefined) =>
  (blocks ?? [])
    .filter((block) => block?._type === "block")
    .map((block) => {
      const text = (block.children ?? [])
        .map((child) => child.text ?? "")
        .join("")
        .trim();

      if (!text) return "";

      const tag = block.style?.startsWith("h") ? block.style : "p";
      return `<${tag}>${escapeHtml(text)}</${tag}>`;
    })
    .filter(Boolean)
    .join("");

const getTodayKey = (date: Date) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

const sanityFetch = async <T>(
  query: string,
  params: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(
    `/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`,
    `https://${SANITY_PROJECT_ID}.apicdn.sanity.io`
  );
  url.searchParams.set("query", query);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Unable to get events from Sanity (${response.status})`);
  }

  const body = (await response.json()) as { result: T };
  return body.result;
};

const toEventDateTime = (
  date: SanityDate | undefined,
  key: "startTime" | "endTime"
) => {
  const startDate = date?.startDate || getTodayKey(new Date());
  const time = date?.[key] || date?.startTime || "00:00";
  return `${startDate}T${time}:00`;
};

const formatPrice = (arrangement: SanityArrangement): string | null => {
  if (arrangement.isFree) return "Gratis";

  const prices = [
    arrangement.priceOrdinar != null ? `Ord. ${arrangement.priceOrdinar} kr` : null,
    arrangement.priceStudent != null ? `Stud. ${arrangement.priceStudent} kr` : null,
    arrangement.priceMedlem != null ? `Medl. ${arrangement.priceMedlem} kr` : null,
  ].filter(Boolean);

  return prices.length > 0 ? prices.join(" / ") : null;
};

const mapImage = (
  imageUrl: SanityArrangement["imageUrl"]
): { id: string; __typename: "sanity" } | null => {
  if (!imageUrl) return null;

  return {
    id: imageUrl,
    __typename: "sanity",
  };
};

const mapTranslations = (arrangement: SanityArrangement): Translation[] => [
  {
    title: arrangement.title ?? arrangement.slug ?? "",
    description: portableTextToHtml(arrangement.description),
    practical_information: [],
    snippets: [],
    languages_code: { url_code: "no" },
  },
];

const getOrganizerName = (arrangement: SanityArrangement) =>
  arrangement.organizerGroup?.name || arrangement.organizerText || "";

const getRoomName = (arrangement: SanityArrangement) =>
  arrangement.room?.title || arrangement.roomText || "";

const getPrimaryDate = (arrangement: SanityArrangement) => {
  const today = getTodayKey(new Date());
  return (
    arrangement.dates?.find((date) => (date.startDate ?? "") >= today) ??
    arrangement.dates?.[0]
  );
};

const mapSanityArrangementToEvent = (arrangement: SanityArrangement): Event => {
  const primaryDate = getPrimaryDate(arrangement);
  const roomName = getRoomName(arrangement);
  const organizerName = getOrganizerName(arrangement);
  const eventTypeName = arrangement.eventType?.name || "";

  return {
    id: arrangement._id,
    status: "published",
    slug: arrangement.slug || arrangement._id,
    event_start: toEventDateTime(primaryDate, "startTime"),
    event_end: toEventDateTime(primaryDate, "endTime"),
    ticket_url: arrangement.ticketUrl ?? null,
    facebook_url: arrangement.facebookUrl ?? null,
    top_image: mapImage(arrangement.imageUrl),
    event_header: mapImage(arrangement.imageUrl),
    room: roomName
      ? [
          {
            room_id: {
              name: roomName,
              floor:
                arrangement.room?.floor != null
                  ? arrangement.room.floor.toString()
                  : "",
            },
          },
        ]
      : [],
    translations: mapTranslations(arrangement),
    is_recurring: Boolean(arrangement.isRecurring),
    weekly_recurring: null,
    event_type: eventTypeName
      ? {
          name: eventTypeName,
          slug: arrangement.eventType?.slug ?? "",
        }
      : null,
    organizer_groups: organizerName
      ? [
          {
            name: organizerName,
            slug: arrangement.organizerGroup?.slug ?? undefined,
          },
        ]
      : [],
    taxonomy_label: [eventTypeName, organizerName].filter(Boolean).join(" / "),
    recurring_label: arrangement.isRecurring ? "Gjentagende arrangement" : null,
    is_internal: false,
    is_featured: false,
    organizer: organizerName ? { name: organizerName } : null,
    categories: eventTypeName ? [{ name: eventTypeName }] : [],
    price: formatPrice(arrangement),
    image_caption: arrangement.imageCaption ?? null,
    sanity_dates: arrangement.dates ?? [],
  };
};

export async function getEventsFromSanity(afterDate: Date): Promise<Event[]> {
  try {
    const arrangements = await sanityFetch<SanityArrangement[]>(
      publishedArrangementsQuery,
      { today: getTodayKey(afterDate) }
    );
    return arrangements.map(mapSanityArrangementToEvent);
  } catch (error) {
    console.error("Unable to get events from Sanity", error);
    return [];
  }
}

export async function getSanityEventBySlug(slug: string): Promise<Event | null> {
  try {
    const arrangement = await sanityFetch<SanityArrangement | null>(
      arrangementBySlugQuery,
      { slug }
    );

    return arrangement ? mapSanityArrangementToEvent(arrangement) : null;
  } catch (error) {
    console.error("Unable to get event from Sanity by slug", error);
    return null;
  }
}

export async function getSanityEventSlugs(): Promise<string[]> {
  try {
    return await sanityFetch<string[]>(arrangementSlugsQuery);
  } catch (error) {
    console.error("Unable to get event slugs from Sanity", error);
    return [];
  }
}
