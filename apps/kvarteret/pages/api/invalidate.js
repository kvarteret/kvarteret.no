import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// TODO:
export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
    // Check if secret is valid
    if(req.query.secret != process.env.INVALIDATE_SECRET)  {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const data = req.body

    const collection = data.collection
    const slug = data.payload.slug

    if(collection && slug) {
        let path = `/${slug}/`;

        if(collection == "events") {
            path = `/events/${slug}/`;
        }
        try {
          await res.unstable_revalidate("/")
          await res.unstable_revalidate(path)
          console.info("Invalidated cache for", path)
          return res.json({ revalidated: true })
        } catch (err) {
            console.log("Error invalidating", path, err)
          // If there was an error, Next.js will continue
          // to show the last successfully generated page
          return res.status(500).send('Error revalidating')
        }
    }
    
    // ...
  }