import { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";
import { getEventsAfter } from "dak-components/lib/cms/events";

// TODO:
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ...
  const search = req.query.search.toString();
  const events = await getEventsAfter("no", new Date());
  const mapped = events;

  const options = {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: [
      "metadata.slug",
      "room.room_id.name",
      "translations.title",
      "translations.description",
    ],
  };

  if (search) {
    const fuse = new Fuse(mapped, options);
    const result = fuse.search(search || "");
    res.status(200).json(result.map((x) => x.item));
    return;
  }
  res.status(200).json(mapped);
  // ...
}
