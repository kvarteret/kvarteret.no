import { queryIndexEvents } from "./queries/events";
import { queryCarouselItems, queryOpeningHours } from "./queries/generalInformation"
import { areIntervalsOverlapping, format, formatRelative, parse } from "date-fns";
import {nb, en} from "date-fns/locale";

const getRelativeDate = (date, lang) => {
    const locale = lang === "no" ? nb : en;
    const relativeString = formatRelative(date, new Date(), {locale, weekStartsOn: 1});
    try {
      const dateFormat = lang === "no" ? "d.MM.yyyy" : "MM/d/yyyy";
      const test = parse(relativeString, dateFormat, new Date(), {locale, weekStartsOn: 1});
      const parseFormat = lang === "no" ? "dd. MMM yyyy" : "dd. MMM. yyyy";
      const formattedRelativeString = format(test, parseFormat, {locale, weekStartsOn: 1});
      return formattedRelativeString;
    } catch(e) {
    }
    return relativeString;
  }

const fetchIndexData = async (lang) => {
    const upcomingEvents = await queryIndexEvents(lang, new Date()); 

    const events = upcomingEvents.map(x=> ({
        title: x.translations[0].title,
        description: x.translations[0].description,
        tags: [
            getRelativeDate(new Date(x.event_start))
        ],
        image: x.top_image,
        url: x.page?.slug || null
    }));

    const eventsToday = upcomingEvents.filter(x=> new Date(x.event_start).getDate() === new Date().getDate() || new Date(x.event_end).getDate() === new Date().getDate()).reduce((acc, event) => {
      const rooms = event.room;
      if(rooms.length == 0) {
        acc.push({
          startTime: "15:00",
          endTime: "20:00",
          title: event.translations[0].title,
        })
        return acc;
      }

      for(const room of rooms) {
        acc.push({
          startTime: "15:00",
          endTime: "20:00",
          room: `${room.room_id.name} (${room.room_id.floor}. etg)`,
          title: event.translations[0].title,
        })
      }
      return acc;
    }, []);
    
    const openingHours = await queryOpeningHours();
    const carouselItems = await queryCarouselItems(lang);
    const result = {events, eventsToday, openingHours, carouselItems};

    return result;
}

export default fetchIndexData;