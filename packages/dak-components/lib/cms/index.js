import { queryCarouselItems, queryOpeningHours, queryTodayText } from "./queries/generalInformation"
import { areIntervalsOverlapping, format, formatRelative, parse, isSameDay } from "date-fns";
import appendBase64Image from "./utils/appendBase64Image";
import { getEventsAfter } from "./events";
import { filterPastEvents } from "../../../../apps/kvarteret/components/infoskjerm/utils";
import { getEvents } from "../crescat";
import { nb, en } from "date-fns/locale";
import { returnDummyData } from "../../../../apps/kvarteret/components/infoskjerm/dummyData";

const getRelativeDate = (date, lang) => {
  const locale = lang === "no" ? nb : en;
  const relativeString = formatRelative(date, new Date(), { locale, weekStartsOn: 1 });
  try {
    const dateFormat = lang === "no" ? "d.MM.yyyy" : "MM/d/yyyy";
    const test = parse(relativeString, dateFormat, new Date(), { locale, weekStartsOn: 1 });
    const parseFormat = lang === "no" ? "dd. MMM yyyy" : "dd. MMM. yyyy";
    const formattedRelativeString = format(test, parseFormat, { locale, weekStartsOn: 1 });
    return formattedRelativeString;
  } catch (e) {
  }
  return relativeString;
}

const getTimeText = (start, end, lang) => {
  // Not yet happened
  if(start >= new Date()) {
    if(lang == "no") return `Starter ${format(start, "HH:mm")}`;
    if(lang == "en") return `Starts ${format(start, "HH:mm")}`;
  }

  //Happening now
  if(new Date() < end) {

    if(isSameDay(new Date(), end)) {
      if(lang == "no") return `Varer til ${format(end, "HH:mm")}`;
      if(lang == "en") return `Lasts until ${format(end, "HH:mm")}`;
    }
    if(lang == "no") return `Varer til ${getRelativeDate(end, lang)}`;
    if(lang == "en") return `Lasts until ${getRelativeDate(end, lang)}`;
  }

  return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
}

const fetchIndexData = async (lang) => {
  const eventsAfter = await getEventsAfter(lang, new Date());
  const upcomingEvents = eventsAfter.slice(0, 6)

  const events = upcomingEvents.map(x => {

    const tags = [
      x.duration,
      x.room[0]?.room_id?.name
    ].filter(x => x);

    return {
      title: x.translations[0]?.title ?? "",
      description: x.translations[0]?.description ?? "",
      tags,
      image: x.top_image,
      url: `events/${x.metadata?.slug || null}`,
      recurring: x.is_recurring,
      startDate: x.event_start
    }
  });

  // TODO: Get events for today properly by querying them such that if the event is overlapping the current date it shows.
  // Is tricky due to recurring events and must be handled correctly

  const crescatData = filterPastEvents(await getEvents());
  // const crescatData = returnDummyData();
  const eventsToday = crescatData.filter(x=>new Date(x.end) > new Date()).reduce((acc, event) => {
    const rooms = event.rooms;
    if (rooms.length == 0) {
      acc.push({
        time: getTimeText(new Date(event.start), new Date(event.end), lang),
        title: event.name,
      })
      return acc;
    }

    for (const room of rooms) {
      acc.push({
        time: getTimeText(new Date(room.start), new Date(room.end), lang),
        room: `${room.name}`,
        title: event.name,
      })
    }
    return acc;
  }, []);

  const openingHours = await queryOpeningHours();
  const todayText = await queryTodayText();
  const carouselItems = await appendBase64Image(await queryCarouselItems(lang));
  const result = { events, eventsToday, openingHours, carouselItems, todayText };

  return result;
}

export default fetchIndexData;