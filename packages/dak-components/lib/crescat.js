import axios from 'axios'

import cache from 'memory-cache';

const cachedGet = async (url, headers) => {
    const cachedResponse = cache.get(url);
    if(cachedResponse) {
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
        Authorization: "Bearer Xp0BQMgYIiXwR1nW5qGR3lzsbg0IspMiHgxRMMhiwHpKaHSEqmUvVpRXBLBrER2cbcsXd6I7Va5jOu5u"
    });

    return crescatData.filter(x=>x.fields.some(x=>x.id === 70879));
}

export {getEvents};