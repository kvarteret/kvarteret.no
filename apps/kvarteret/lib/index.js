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
    const upcomingEvents = await queryIndexEvents(lang, format(new Date(), "yyyy-MM-dd|HH:MM").replace("|", "T")); 

    const events = upcomingEvents.map(x=> {

      const tags = [
        getRelativeDate(new Date(x.event_start)),
        x.room[0]?.room_id?.name
      ].filter(x=>x);

      return {
        title: x.translations[0].title,
        description: x.translations[0].description,
        tags,
        image: x.top_image,
        url: x.page?.slug || null
    }
    });

    // TODO: Get events for today properly by querying them such that if the event is overlapping the current date it shows. 
    // Is tricky due to recurring events and must be handled correctly
    const eventsToday = upcomingEvents.filter(x=> new Date(x.event_start).getDate() === new Date().getDate() || new Date(x.event_end).getDate() === new Date().getDate()).reduce((acc, event) => {
      const rooms = event.room;
      if(rooms.length == 0) {
        acc.push({
          startTime: format(new Date(event.event_start), "HH:mm"),
          endTime: format(new Date(event.event_end), "HH:mm"),
          title: event.translations[0].title,
        })
        return acc;
      }

      for(const room of rooms) {
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
    const carouselItems = await queryCarouselItems(lang);
    const result = {events, eventsToday, openingHours, carouselItems};

    return result;
}

export default fetchIndexData;