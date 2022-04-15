import { queryCarouselItems, queryOpeningHours, queryTodayText } from "./queries/generalInformation"
import { areIntervalsOverlapping, format, formatRelative, parse } from "date-fns";
import { nb, en } from "date-fns/locale";
import appendBase64Image from "./utils/appendBase64Image";
import axios from 'axios';
import { getEventsAfter } from "./events";


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