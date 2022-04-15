import {queryAllEvents} from "dak-components/lib/cms/queries/events";
import { getEvents } from "dak-components/lib/studentBergen";
import cache from "memory-cache";
import Fuse from 'fuse.js'

const allEvents = async () => {
    const studentBergen = await getEvents();
    const cmsEvents = await queryAllEvents();

    const eventItems = cmsEvents;
    const mappedSlugs = eventItems.filter(x=>x.metadata?.slug).reduce((acc, x) => {
        acc[x.metadata.slug] = true;
        return acc;
    }, {});

    // Merge the event sources. No longer necessary when studentBergen events in cms
    for(const event of studentBergen) {
        if(mappedSlugs[event.metadata.slug]) continue;
        mappedSlugs[event.metadata.slug] = true;
        eventItems.push(event);
    }

    return eventItems;
}

const allEventsCached = async () => {
    if(cache.get("events")) {
        return cache.get("events");
    }

    const events = await allEvents();
    cache.put("events", events);

    return events;
}

// TODO:
export default async function handler(req, res) {
    // ...
    const { search } = req.query;
    console.log("SEARCH", search);
    const events = await allEvents();
    const mapped = events.filter(x => new Date(x.event_end || x.start_date) >= new Date());
    
    const options = {
        isCaseSensitive: false,
        includeScore: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.6,
        distance: 100,
        useExtendedSearch: false,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1,
        keys: [
          "metadata.slug",
          "room.room_id.name",
          "translations.title",
          "translations.description",
        ]
      };

      if(search) {
          const fuse = new Fuse(mapped, options);
          const result = fuse.search(search || "");
          res.status(200).json(result.map(x=>x.item));
          return;
      }
    res.status(200).json(mapped)
    // ...
}