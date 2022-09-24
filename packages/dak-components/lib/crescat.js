import axios from 'axios'

import cache from 'memory-cache';

const cachedGet = async (url, headers) => {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
        return cachedResponse;
    }

    const cacheTime = 1000 * 60 * 30; //Cached for 1 minutes
    const response = await axios.get(url, {
        headers
    });
    const data = response.data;
    cache.put(url, data, cacheTime);
    return data;
}

const getEvents = async () => {
    // TODO: Place as env variable
    const crescatData = await cachedGet("https://app.crescat.io/external/v1/calendar", {
        Authorization: `Bearer ${process.env.CRESCAT_TOKEN}`
    });

    // Holds all ids for different event types - Not complete
    const eventIDs = [80, 137, 149];

    // Array to be returned when filled
    var crescatEvents = [];

    console.debug(crescatEvents);

    // Sorts out the events from the Crescat payload that has a certain event-type
    for (var i = 0; i < crescatData.length; i++) {

        console.debug(crescatData[0]);
        if (eventIDs.includes(crescatData[i].event_type_id)) {
            crescatEvents.push(crescatData[i]);
        }

    }

    return crescatEvents;

    /* return crescatData.filter(x => x.fields.some(x => x.id === 70879)); */

}

export { getEvents };