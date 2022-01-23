import axios from 'axios'

import cache from 'memory-cache';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';

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
const externalMapping = (event) => {
    return {
      status: "published",
        event_start: event.startTime,
        event_end: event.endTime,
        is_recurring: false,
        top_image: {
            __typename: "studentBergen",
            id: event.image?.path
        },
        event_header: {
            __typename: "studentBergen",
            id: event.image?.path
        },
        room: [], // Unsure if it is possible to extract room from studentBergen, it isn't a field there. Might be possible with crescat?
        metadata: {
            slug: event.slug
        },
        organizer: {
            name: event.eventBy.name
        },
        weekly_recurring: [],
        translations: [
            {
                title: event.name,
                description: event.intro,
                content: sanitizeHtml(event.article),
                practical_information: [],
                snippets: []
            }
        ]
    }
  }

// TODO:
export default async function handler(req, res) {
    const { slug } = req.query
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
    const event = withSlug.filter(x=>x.slug === slug).reduce((a, b) => (new Date(a.event_start) > new Date(b.event_start) ? a : b));

    res.status(200).json(externalMapping(event));
}