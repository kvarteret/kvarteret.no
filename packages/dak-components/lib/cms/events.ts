import { getEvents } from "../studentBergen";
import { Event, Locale, queryAllEvents } from "./queries/events";
import { nb, enGB } from "date-fns/locale";
import { format, formatRelative, parse } from "date-fns";

const getUpcomingEventsFromStudentBergen = async (date: Date) => {
  const response = await getEvents();
  const mapped = response.filter(
    (x) => new Date(x.event_end || x.event_start) >= date
  );
  return mapped;
};

const getRelativeDate = (date: Date, lang: Locale) => {
  const locale = lang === "no" ? nb : enGB;
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

const getTimeText = (x: Event, lang: Locale) => {
  // Not yet happened
  if (new Date(x.event_start) > new Date()) {
    return getRelativeDate(new Date(x.event_start), lang);
  }

  //Happening now
  // Default end time to two hours into future.
  const parsedEndDate = x.event_end
    ? new Date(x.event_end)
    : new Date(new Date(x.event_start).getTime() + 2 * 60 * 60_000);

  if (new Date() < parsedEndDate) {
    if (lang == "no")
      return `Varer til ${getRelativeDate(parsedEndDate, lang)}`;
    if (lang == "en")
      return `Lasts until ${getRelativeDate(parsedEndDate, lang)}`;
  }
};
const getEventsAfter = async (lang: Locale, date: Date) => {
  const upcomingEventsCmsPromise = queryAllEvents(date);
  const upcomingEventsBergenPromise = getUpcomingEventsFromStudentBergen(date);

  const [upcomingEventsCms, upcomingEventsBergen] = await Promise.all([
    upcomingEventsCmsPromise,
    upcomingEventsBergenPromise,
  ]);

  const upcomingEvents = upcomingEventsCms
    .concat(upcomingEventsBergen)
    .sort((a, b) =>
      new Date(a.event_start) > new Date(b.event_start) ? 1 : -1
    );
  return upcomingEvents.map((x) => ({ ...x, duration: getTimeText(x, lang) }));
};

export { getEventsAfter };
