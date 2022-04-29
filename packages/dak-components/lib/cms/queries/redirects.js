import NodeCache from "node-cache";
import {differenceInMinutes} from "date-fns"
const redirectCache = new NodeCache();

async function upstash({
  url,
  token,
  ...init
}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...init.headers,
    },
  })

  const data = res.headers.get('Content-Type').includes('application/json')
    ? await res.json()
    : await res.text()

  if (res.ok) {
    return data
  } else {
    throw new Error(
      `Upstash failed with (${res.status}): ${
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      }`
    )
  }
}

const getAllRedirects = async () => {
  const {data: redirects} = await upstash({
    token: "ThisIsTestToken",
    url: 'https://cms.kvarteret.no/items/redirects',
  })
  redirectCache.set("redirects", {time: new Date(), redirects: redirects});

  return redirects;
};

const getAllRedirectsCached = async () => {
  let {redirects, time} = redirectCache.get("redirects") || {};

  if (differenceInMinutes(new Date(), time) <= 60) {
    return redirects;
  }
  
  return await getAllRedirects();
};

export async function getRedirectBySlugCached(slug) {
  const redirects = await getAllRedirectsCached();
  return redirects.find((x) => x.slug === slug);
}
