import axios from 'axios'
import cache from 'memory-cache';
import slugify from "slugify";
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

const getEvents = async () => {
    // TODO: Place as env variable
    const studentBergenData = await cachedGet("https://studentbergen.netflex.dev/api/student_org/11028/events?cohosting=true", {
        Authorization: `Bearer ${process.env.STUDENTBERGEN_TOKEN}`
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
    return withSlug.map(externalMapping);
}

const getImage = (id) => {
    if(!id) {
        return {
            __typename: "directus_files",
            id: "55664499-2abb-4a88-8f92-d46339584061"
        }
    }
    return {
        __typename: "studentBergen",
        id
    }
}

const externalMapping = (event) => {
    return {
      status: "published",
        event_start: event.startTime,
        event_end: event.endTime,
        is_recurring: false,
        price: event.price,
        ticketsUrl: event.ticketsUrl,
        facebook: event.facebookUrl,
        top_image: getImage(event.image?.path),
        categories: [event.category, ...event.subCategories],
        event_header: getImage(event.image?.path),
        room: [], // Unsure if it is possible to extract room from studentBergen, it isn't a field there. Might be possible with crescat?
        slug: event.slug,
        organizer: {
            name: event.eventBy?.name
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
const getEventBySlug = async (slug) => {
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
    const event = withSlug.filter(x=>x.slug === slug).sort((a, b) => (new Date(a.event_start) > new Date(b.event_start) ? a : b))[0];
    if(!event) {
        throw Error(`event not found: ${slug}`)
    }
    return externalMapping(event);
}


export {getEvents, getEventBySlug};