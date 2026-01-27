import { initializeApp, getApps } from "firebase/app";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Event, Translation } from "./cms/queries/events";

const firebaseConfig = {
  apiKey: "AIzaSyBpatog9K4wgBpXy5XE-YHcmTwALjlOBUA",
  authDomain: "kvarteret-events.firebaseapp.com",
  projectId: "kvarteret-events",
  storageBucket: "kvarteret-events.firebasestorage.app",
  messagingSenderId: "915628626345",
  appId: "1:915628626345:web:93fb93170dd30e67ce74b8",
  measurementId: "G-WF7KTB43GJ",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  event_start: Timestamp;
  event_end: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
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
    location: doc.location ?? { no: null, en: null },
  };
}

/**
 * Get all published events from Firestore that start after the given date
 */
export async function getEventsFromFirestore(afterDate: Date): Promise<Event[]> {
  try {
    console.log("[firestore] getEventsFromFirestore start", { afterDate: afterDate.toISOString() });
    const eventsQuery = query(
      collection(db, "events"),
      where("status", "==", "published"),
      where("event_start", ">=", Timestamp.fromDate(afterDate)),
      orderBy("event_start", "asc")
    );
    const snapshot = await getDocs(eventsQuery);
    console.log("[firestore] getEventsFromFirestore docs", { count: snapshot.size });

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
    const eventQuery = query(
      collection(db, "events"),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(eventQuery);

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
