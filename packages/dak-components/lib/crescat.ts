import axios, { AxiosRequestHeaders } from 'axios'

import cache from 'memory-cache';

// Fetches the data from a given URL
const cachedGet = async (url: string, headers: AxiosRequestHeaders) => {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
        return cachedResponse;
    }

    const cacheTime = 1000 * 60 * 30; //Cached for 1 minutes
    const response = await axios.get(url, {
        headers
    });

    // Establishes the data from the URL-response
    const data = response.data;
    cache.put(url, data, cacheTime);
    return data;
}


const getEvents = async () => {

    // Fetches json payload from the Crescat booking site
    const crescatData = await cachedGet("https://app.crescat.io/external/v1/calendar", {
        Authorization: `Bearer ${process.env.CRESCAT_TOKEN}`
    });

    var rawShowTimes = Array();

    // Cycles through all events in crescatData and retrieves showtimes
    for (var ievent = 0; ievent < crescatData.length; ievent++) {

        rawShowTimes.push(crescatData[ievent].show_times)
    };

    // Array to be returned
    var jsonShowTimes = Array();

    // Retrieves the json-elements from raw showtimes array
    for (var stIndex = 0; stIndex < rawShowTimes.length; stIndex++) {

        for (var stIndex2 = 0; stIndex2 < rawShowTimes[stIndex].length; stIndex2++) {
            if (rawShowTimes[stIndex] != []) {
                jsonShowTimes.push(rawShowTimes[stIndex][stIndex2]);
            };
        };
    };

    return jsonShowTimes;

    //return crescatData.filter(x => x.fields.some(x => x.id === 70879));
}



export { getEvents };

// Type definition for the crescatData
export interface CrescatEvent {
    id: number;
    name: string;
    start: Date;
    end: Date;
    event_type_id: number;
    rooms: Room[];
    show_times: Show_Times[];
    fields: Field[];
}

export interface Field {
    value: null | string;
    show_time_id: null;
    id: number;
}

export interface Room {
    name: string;
    id: number;
    title: null | string;
    start: Date;
    end: Date;
}


export interface Show_Times {
    id: number;
    title: string;
    description: string | null;
    confirmed: boolean;
    start: string;
    end: string;
    room_id: number;

}