import { queryIndexEvents } from "./queries/events";
import { queryCarouselItems, queryOpeningHours, queryTodayText } from "./queries/generalInformation"
import { areIntervalsOverlapping, format, formatRelative, parse } from "date-fns";
import { nb, en } from "date-fns/locale";
import appendBase64Image from "./utils/appendBase64Image";
import axios from 'axios';
import { getEvents } from "../studentBergen";

const getUpcomingEventsFromStudentBergen = async () => {
  const response = await getEvents();
  const mapped = response.filter(x => new Date(x.event_end || x.start_date) >= new Date());
  return mapped;
}

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

const fetchIndexData = async (lang) => {
  const upcomingEventsCms = await queryIndexEvents(lang, new Date());
  const upcomingEventsBergen = await getUpcomingEventsFromStudentBergen();
  
  const upcomingEvents = await appendBase64Image(upcomingEventsCms.concat(upcomingEventsBergen).sort((a, b) => new Date(a.event_start) - new Date(b.event_start)).slice(0, 6))

  const events = upcomingEvents.map(x => {

    const getTimeText = () => {
      // Not yet happened
      if(new Date(x.event_start) > new Date()) {
        return getRelativeDate(new Date(x.event_start), lang);
      }

      //Happening now
      if(new Date() < new Date(x.event_end)) {
        if(lang == "no") return `Varer til ${getRelativeDate(new Date(x.event_end), lang)}`;
        if(lang == "en") return `Lasts until ${getRelativeDate(new Date(x.event_end), lang)}`;
      }
    }

    const tags = [
      getTimeText(),
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
  const eventsToday = upcomingEvents.filter(x => new Date(x.event_start) <= new Date() && new Date(x.event_end) >= new Date()).reduce((acc, event) => {
    const rooms = event.room;
    if (rooms.length == 0) {
      acc.push({
        startTime: format(new Date(event.event_start), "HH:mm"),
        endTime: format(new Date(event.event_end), "HH:mm"),
        title: event.translations[0].title,
      })
      return acc;
    }

    for (const room of rooms) {
      acc.push({
        startTime: format(new Date(event.event_start), "HH:mm"),
        endTime: format(new Date(event.event_end), "HH:mm"),
        room: `${room.room_id.name} (${room.room_id.floor}. etg)`,
        title: event.translations[0].title,
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