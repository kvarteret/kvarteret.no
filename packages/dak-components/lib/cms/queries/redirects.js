import { gql } from "@apollo/client";
import cmsClient from "../cmsClient";
import NodeCache from "node-cache";
import {differenceInMinutes} from "date-fns"
const redirectCache = new NodeCache();

const getAllRedirects = async () => {
  const { data } = await cmsClient.query({
    query: gql`
      query GetAllRedirects {
        redirects {
          slug
          permanent
          destination
        }
      }
    `,
  });

  redirectCache.set("redirects", {time: new Date(), redirects: data.redirects});

  return data.redirects;
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
