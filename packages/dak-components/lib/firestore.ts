import * as admin from "firebase-admin";
import { Event, Translation } from "./cms/queries/events";

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : undefined;

  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

/**
 * Firestore document types (matching frontend-eventside schema)
 */
interface FirestoreTranslation {
  available: boolean;
  title: string;
  description: string | null;
  content: string | null;
  image_caption: string | null;
}

interface FirestoreEvent {
  id: string;
  slug: string;
  status: "published" | "draft" | "archived";
  event_start: admin.firestore.Timestamp;
  event_end: admin.firestore.Timestamp;
  created_at: admin.firestore.Timestamp;
  updated_at: admin.firestore.Timestamp;
  ticket_url: string | null;
  facebook_url: string | null;
  image: { url: string; __typename: "firestore" } | null;
  organizer: { id: number | null; name: string } | null;
  categories: { id: number; name: string }[];
  price: string | null;
  translations: {
    no: FirestoreTranslation | null;
    en: FirestoreTranslation | null;
  };
  location: { no: string | null; en: string | null };
  is_recurring: false;
  weekly_recurring: null;
}

/**
 * Map a Firestore event document to the kvarteret.no Event interface
 */
function mapFirestoreToEvent(doc: FirestoreEvent): Event {
  const translations: Translation[] = [];

  if (doc.translations.no) {
    translations.push({
      title: doc.translations.no.title,
      description: doc.translations.no.description,
      content: doc.translations.no.content,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "no" },
    });
  }

  if (doc.translations.en) {
    translations.push({
      title: doc.translations.en.title,
      description: doc.translations.en.description,
      content: doc.translations.en.content,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "en" },
    });
  }

  // Fallback: if no translations, create a minimal one
  if (translations.length === 0) {
    translations.push({
      title: doc.slug,
      description: null,
      content: null,
      practical_information: [],
      snippets: [],
      languages_code: { url_code: "no" },
    });
  }

  return {
    id: doc.id,
    status: doc.status,
    slug: doc.slug,
    event_start: doc.event_start.toDate().toISOString(),
    event_end: doc.event_end.toDate().toISOString(),
    is_recurring: false,
    weekly_recurring: null,
    ticket_url: doc.ticket_url,
    facebook_url: doc.facebook_url,
    top_image: doc.image,
    event_header: doc.image,
    room: [], // Firestore events use location text, not room references
    organizer: doc.organizer,
    categories: doc.categories,
    price: doc.price,
    translations,
  };
}

/**
 * Get all published events from Firestore that start after the given date
 */
export async function getEventsFromFirestore(afterDate: Date): Promise<Event[]> {
  try {
    const snapshot = await db
      .collection("events")
      .where("status", "==", "published")
      .where("event_start", ">=", admin.firestore.Timestamp.fromDate(afterDate))
      .orderBy("event_start", "asc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<FirestoreEvent, "id">;
      return mapFirestoreToEvent({ id: doc.id, ...data });
    });
  } catch (error) {
    console.error("Unable to get events from Firestore", error);
    return [];
  }
}

/**
 * Get a single event from Firestore by slug
 */
export async function getFirestoreEventBySlug(
  slug: string
): Promise<Event | null> {
  try {
    const snapshot = await db
      .collection("events")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data() as Omit<FirestoreEvent, "id">;
    return mapFirestoreToEvent({ id: doc.id, ...data });
  } catch (error) {
    console.error("Unable to get event from Firestore by slug", error);
    return null;
  }
}
