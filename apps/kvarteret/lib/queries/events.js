import { gql } from "@apollo/client";
import { format, formatDistance, formatRelative, parse } from "date-fns";
import cmsClient from "../cmsClient";
import {nb, en} from "date-fns/locale";

const getBiggest = (a, b) => {
  if(a > b) return a;
  if(a < b) return b;
  return a;
}

const weekdayLookup = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const replaceTime = (date, time) => {
  date.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), 0, 0);
  return date;
}

const spreadRecurringEvents = (events) => {
  return events.reduce((acc, event) => {
    const eStart = new Date(event.event_start + "Z");
    const start = getBiggest(new Date(), eStart);
    replaceTime(start, eStart);
    console.log("START", eStart);
    const end = new Date(event.event_end + "Z");
    console.log("END", end);

    for(let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const nD = new Date(d);
      const weekday = weekdayLookup[new Date(nD).getDay()];
      if(!event.weekly_recurring.includes(weekday)) continue;
      const realStart = nD;
      const realEnd = replaceTime(new Date(nD), end);

      if(realStart > realEnd) {
        realEnd.setDate(realEnd.getDate() + 1);
      }
      
      acc.push({...event, event_start: realStart.toISOString(), event_end: realEnd.toISOString()});      
    }

    return acc
  }, []).sort((a, b) => new Date(a.event_start) - new Date(b.event_start)).slice(0,7);
}

const queryRecurringEventsFiltered = async (lang, filterDate) => {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
    query RecurringEventsIndexFiltered($lang: String, $filterDate: String) {
      events(limit: 6, sort: "event_start", filter: { 
        _and: [
          {
            event_start: {
              _lte: $filterDate
            }
          },
          {
            event_end: {
              _gte: $filterDate
            }
          },
        {
          is_recurring: {_eq: true}
        }
        ]
        }) {
        event_end
        event_start
        top_image {
          id
        }
        room {
          room_id {
            name
          }
        }
        page {
          slug
        }
        weekly_recurring
        translations(
          filter: { languages_code: { url_code: { _eq: $lang } } }
        ) {
          title
          description
        }
      }
    }
    `,
  });

  let events = data.data.events;
  const realEvents = spreadRecurringEvents(events);

  return realEvents;
}

export async function queryIndexEvents(lang, filterDate) {
  const data = await cmsClient.query({
    variables: { lang, filterDate },
    query: gql`
    query IndexEventsFiltered($lang: String, $filterDate: String) {
      events(limit: 6, sort: "event_start", filter: { 
        _and: [
          {
        _or: [
          {
            event_start: {
              _gte: $filterDate
            }
          },
          {
            event_end: {
              _gte: $filterDate
            }
          }
        ]},
        {
          is_recurring: {_eq: false}
        }
        ]
        }) {
        event_end
        event_start
        top_image {
          id
        }
        room {
          room_id {
            name
          }
        }
        page {
          slug
        }
        translations(
          filter: { languages_code: { url_code: { _eq: $lang } } }
        ) {
          title
          description
        }
      }
    }
    `,
  });

  const recurring = await queryRecurringEventsFiltered(lang, filterDate);
  const regularEvents = data.data.events;

  const events = [...regularEvents, ...recurring].sort((a, b) => new Date(a.event_start) - new Date(b.event_start)).slice(0, 7);

  
  const getRelativeDate = (date, lang) => {
    const locale = lang === "no" ? nb : en;
    const relativeString = formatRelative(date, new Date(), {locale, weekStartsOn: 1});
    try {
      console.log("RELATIVE", relativeString);
      const dateFormat = lang === "no" ? "d.MM.yyyy" : "MM/d/yyyy";
      const test = parse(relativeString, dateFormat, new Date(), {locale, weekStartsOn: 1});
      console.log("TEST", test, dateFormat);
      const parseFormat = lang === "no" ? "dd. MMM yyyy" : "dd. MMM. yyyy";
      const formattedRelativeString = format(test, parseFormat, {locale, weekStartsOn: 1});
      console.log("FORMATTED", formattedRelativeString);
      return formattedRelativeString;
    } catch(e) {
      console.log("E", e, relativeString);
    }
    return relativeString;
  }

  return events.map(x=> ({...x, event_start: getRelativeDate(new Date(x.event_start), lang)}));
}
