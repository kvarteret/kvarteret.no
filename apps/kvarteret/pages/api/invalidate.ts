import Cors from "cors";
import { queryPageSlugById } from "dak-components/lib/cms/queries/page";
import { NextApiRequest, NextApiResponse } from "next";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// TODO:
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  // Check if secret is valid
  if (req.query.secret != process.env.INVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const data = req?.body;
  const collection = data?.collection;

  await res.revalidate("/");
  if (collection === "page") {
    const ids = data.keys || [];

    const results = (
      await Promise.allSettled(
        ids.map(async (id) => {
          const slug = await queryPageSlugById(id);
          const result = await Promise.allSettled([
            res.revalidate(`/${slug}/`),
            res.revalidate(`/no/${slug}/`),
            res.revalidate(`/en/${slug}/`),
          ]);
          console.info("Invalidated page ", slug);
          return result;
        })
      )
    ).flat();

    if (results.some((x) => x.status === "rejected")) {
      console.error("Failed to invalidate page", results);
      return res.status(500).send("Error revalidating");
    }
    return res.json({ revalidated: true });
  }

  return res.status(400).json({ message: "Invalid payload" });
  // ...
}
