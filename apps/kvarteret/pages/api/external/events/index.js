import axios from 'axios'

import cache from 'memory-cache';
import slugify from "slugify";

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

    const usedSlugs = {};

    const withSlug = studentBergenData.map(x=> {
        let slug = slugify(x.name, {strict: true, lower: true});
        usedSlugs[slug] = (usedSlugs[slug] || 0) + 1;

        if(usedSlugs[slug] > 1) {
            slug = slug + "-" + (usedSlugs[slug] - 1).toString();
        }


        return {...x, slug};
    });

    res.status(200).json(withSlug);
}