import { createDirectus, graphql, staticToken } from "@directus/sdk";

export default function getDirectusClient() {
  if (!import.meta.env.DIRECTUS_STATIC_TOKEN) {
    throw new Error("No static token for CMS found");
  }
  if (!import.meta.env.PUBLIC_DIRECTUS_URL) {
    throw new Error("No public directus CMS url found");
  }

  return createDirectus<DirectusCMSSchema>(import.meta.env.PUBLIC_DIRECTUS_URL)
    .with(graphql())
    .with(staticToken(import.meta.env.DIRECTUS_STATIC_TOKEN));
}

export function getAssetURL(id?: string | null) {
  if (!id) return null;
  return `${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${id}`;
}

export interface DirectusCMSSchema {
  events: Event[];
}

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
