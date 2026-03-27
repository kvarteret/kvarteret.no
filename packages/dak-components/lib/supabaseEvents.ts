import { Event, Translation } from "./cms/queries/events";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  "https://jeezqitchepgwxjknwhz.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  "sb_publishable_z2eZR6_Ao8Uc8qfmrvNj1A_0AjgALRO";

type EventTypeRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

type OrganizerGroupRow = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  default_event_type_id: string | null;
};

type RoomRow = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  is_active: boolean;
};

type SupabaseTranslation = {
  available: boolean;
  title: string;
  description: string | null;
  image_caption: string | null;
};

type SupabaseEvent = {
  id: string;
  slug: string;
  status: "published" | "draft" | "archived";
  event_start: string;
  event_end: string;
  ticket_url: string | null;
  facebook_url: string | null;
  image_url: string | null;
  price: string | null;
  room_id: string | null;
  room_text: string | null;
  is_internal: boolean;
  is_featured: boolean;
  recurring_interval_days: number | null;
  translations: {
    no: SupabaseTranslation | null;
    en: SupabaseTranslation | null;
  };
  event_type: EventTypeRow | null;
  room: RoomRow | null;
  event_organizer_group_memberships:
    | {
        display_order: number;
        organizer_group: OrganizerGroupRow | null;
      }[]
    | null;
};

const EVENT_SELECT = [
  "id",
  "slug",
  "status",
  "event_start",
  "event_end",
  "ticket_url",
  "facebook_url",
  "image_url",
  "price",
  "room_id",
  "room_text",
  "is_internal",
  "is_featured",
  "recurring_interval_days",
  "translations",
  "event_type:event_types(id,slug,name,description,sort_order,is_active)",
  "room:rooms(id,slug,name,sort_order,is_active)",
  "event_organizer_group_memberships(display_order,organizer_group:event_organizer_groups(id,slug,name,sort_order,is_active,default_event_type_id))",
].join(",");

const mapImage = (
  imageUrl: SupabaseEvent["image_url"]
): { id: string; __typename: "supabase" } | null => {
  if (!imageUrl) return null;

  return {
    id: imageUrl,
    __typename: "supabase",
  };
};

const mapRoom = (event: SupabaseEvent): Event["room"] => {
  const roomName = event.room?.name ?? event.room_text?.trim();
  if (!roomName) {
    return [];
  }

  return [
    {
      room_id: {
        name: roomName,
        floor: "",
      },
    },
  ];
};

const buildEventTaxonomyLabel = (event: SupabaseEvent): string => {
  const eventTypeName = event.event_type?.name ?? "";
  const organizerGroups = [...(event.event_organizer_group_memberships ?? [])]
    .sort((left, right) => left.display_order - right.display_order)
    .map((membership) => membership.organizer_group?.name)
    .filter(Boolean)
    .join(", ");

  if (!eventTypeName) {
    return organizerGroups;
  }

  if (!organizerGroups) {
    return eventTypeName;
  }

  return `${eventTypeName} (${organizerGroups})`;
};

const buildRecurringLabel = (
  recurringIntervalDays: number | null
): string | null => {
  if (!recurringIntervalDays) {
    return null;
  }

  return `every ${recurringIntervalDays} days`;
};

const mapTranslations = (event: SupabaseEvent): Translation[] => {
  const translations: Translation[] = [];

  if (event.translations.no) {
    translations.push({
      title: event.translations.no.title,
      description: event.translations.no.description,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "no" },
    });
  }

  if (event.translations.en) {
    translations.push({
      title: event.translations.en.title,
      description: event.translations.en.description,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "en" },
    });
  }

  if (translations.length > 0) {
    return translations;
  }

  return [
    {
      title: event.slug,
      description: null,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "no" },
    },
  ];
};

const mapSupabaseToEvent = (event: SupabaseEvent): Event => ({
  id: event.id,
  status: event.status,
  slug: event.slug,
  event_start: event.event_start,
  event_end: event.event_end,
  ticket_url: event.ticket_url,
  facebook_url: event.facebook_url,
  top_image: mapImage(event.image_url),
  event_header: mapImage(event.image_url),
  room: mapRoom(event),
  translations: mapTranslations(event),
  is_recurring: Boolean(event.recurring_interval_days),
  weekly_recurring: null,
  event_type: event.event_type
    ? {
        name: event.event_type.name,
        slug: event.event_type.slug,
      }
    : null,
  organizer_groups: [...(event.event_organizer_group_memberships ?? [])]
    .sort((left, right) => left.display_order - right.display_order)
    .map((membership) => membership.organizer_group)
    .filter(Boolean)
    .map((group) => ({
      name: group.name,
      slug: group.slug,
    })),
  taxonomy_label: buildEventTaxonomyLabel(event),
  recurring_interval_days: event.recurring_interval_days,
  recurring_label: buildRecurringLabel(event.recurring_interval_days),
  is_internal: event.is_internal,
  is_featured: event.is_featured,
  price: event.price,
});

const fetchSupabaseEvents = async (
  options: {
    afterDate?: Date;
    slug?: string;
  }
): Promise<SupabaseEvent[]> => {
  const url = new URL("/rest/v1/events", SUPABASE_URL);
  url.searchParams.set("select", EVENT_SELECT);
  url.searchParams.set("status", "eq.published");
  url.searchParams.set("is_internal", "eq.false");
  url.searchParams.set("order", "event_start.asc");

  if (options.afterDate) {
    url.searchParams.set("event_start", `gte.${options.afterDate.toISOString()}`);
  }

  if (options.slug) {
    url.searchParams.set("slug", `eq.${options.slug}`);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to get events from Supabase (${response.status})`);
  }

  return (await response.json()) as SupabaseEvent[];
};

export async function getEventsFromSupabase(afterDate: Date): Promise<Event[]> {
  try {
    const events = await fetchSupabaseEvents({ afterDate });
    return events.map(mapSupabaseToEvent);
  } catch (error) {
    console.error("Unable to get events from Supabase", error);
    return [];
  }
}

export async function getSupabaseEventBySlug(slug: string): Promise<Event | null> {
  try {
    const events = await fetchSupabaseEvents({ slug });
    const event = events[0];

    return event ? mapSupabaseToEvent(event) : null;
  } catch (error) {
    console.error("Unable to get event from Supabase by slug", error);
    return null;
  }
}
