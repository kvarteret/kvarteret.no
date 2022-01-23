import axios from 'axios'

import cache from 'memory-cache';

const cachedGet = async (url, headers) => {
    const cachedResponse = cache.get(url);
    if(cachedResponse) {
        return cachedResponse;
    }

    const cacheTime = 1000 * 60 * 60; //Cached for 1 hour
    const response = await axios.get(url, {
        headers
    });
    const data = response.data;
    cache.put(url, data, cacheTime);
    return data;
}

// TODO:
export default async function handler(req, res) {
    // TODO: Place as env variable
    const studentBergenData = await cachedGet("https://studentbergen.netflex.dev/api/student_org/11028/events?cohosting=true", {
        Authorization: "Bearer 059af681a5606a521cc1475e8f81a3c04c70ac40dbae02f52895e0112a6bba73"
    });

    res.status(200).json(studentBergenData);
}