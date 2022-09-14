import { getEvents } from "../studentBergen";
import { queryIndexEvents } from "./queries/events";
import { nb, en } from "date-fns/locale";
import { format, formatRelative, parse } from "date-fns";

const getUpcomingEventsFromStudentBergen = async (date) => {
  const response = await getEvents();
  const mapped = response.filter(
    (x) => new Date(x.event_end || x.start_date) >= date
  );
  return mapped;
};

const getRelativeDate = (date, lang) => {
  const locale = lang === "no" ? nb : en;
  const relativeString = formatRelative(date, new Date(), {
    locale,
    weekStartsOn: 1,
  });
  try {
    const dateFormat = lang === "no" ? "d.MM.yyyy" : "MM/d/yyyy";
    const test = parse(relativeString, dateFormat, new Date(), {
      locale,
      weekStartsOn: 1,
    });
    const parseFormat = lang === "no" ? "dd. MMM yyyy" : "dd. MMM. yyyy";
    const formattedRelativeString = format(test, parseFormat, {
      locale,
      weekStartsOn: 1,
    });
    return formattedRelativeString;
  } catch (e) {}
  return relativeString;
};

const getTimeText = (x, lang) => {
  // Not yet happened
  if (new Date(x.event_start) > new Date()) {
    return getRelativeDate(new Date(x.event_start), lang);
  }

  //Happening now
  if (new Date() < new Date(x.event_end)) {
    if (lang == "no")
      return `Varer til ${getRelativeDate(new Date(x.event_end), lang)}`;
    if (lang == "en")
      return `Lasts until ${getRelativeDate(new Date(x.event_end), lang)}`;
  }
};
const getEventsAfter = async (lang, date) => {
  const upcomingEventsCmsPromise = queryIndexEvents(lang, date);
  const upcomingEventsBergenPromise = getUpcomingEventsFromStudentBergen(date);

  const [upcomingEventsCms, upcomingEventsBergen] = await Promise.all([
    upcomingEventsCmsPromise,
    upcomingEventsBergenPromise,
  ]);

  const upcomingEvents = upcomingEventsCms
    .concat(upcomingEventsBergen)
    .sort((a, b) => new Date(a.event_start) - new Date(b.event_start));
  return upcomingEvents.map((x) => ({ ...x, duration: getTimeText(x, lang) }));
};

export { getEventsAfter };
