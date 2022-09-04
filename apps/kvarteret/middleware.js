import { NextResponse } from "next/server";
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;

  const redirect = await getRedirectBySlugCached(pathname.slice(1, -1));
  if (redirect) {
    return NextResponse.redirect(redirect.destination);
  }
  return NextResponse.next();
}
import PureCache from 'pure-cache';
import { differenceInMinutes } from "date-fns";
const redirectCache = new PureCache();

async function upstash({ url, token, ...init }) {
  const res = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });

  const data = res.headers.get("Content-Type").includes("application/json")
    ? await res.json()
    : await res.text();

  if (res.ok) {
    return data;
  } else {
    throw new Error(
      `Upstash failed with (${res.status}): ${
        typeof data === "string" ? data : JSON.stringify(data, null, 2)
      }`
    );
  }
}

const getAllRedirects = async () => {
  console.log(process.env);
  const { data: redirects } = await upstash({
    token: process.env.CMS_TOKEN,
    url: "https://cms.kvarteret.no/items/redirects",
  });
  redirectCache.put("redirects", { time: new Date(), redirects: redirects });

  return redirects;
};

const getAllRedirectsCached = () => {
  let { redirects, time } = redirectCache.get("redirects") || {};

  if (differenceInMinutes(new Date(), time) <= 60) {
    return redirects;
  }

  return getAllRedirects();
};

async function getRedirectBySlugCached(slug) {
  const redirects = await getAllRedirectsCached();
  return redirects.find((x) => x.slug === slug);
}
