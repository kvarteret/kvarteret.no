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
    // ...
    const {data, path} = req.query;
    
    console.log("SETTING PREVIEW DATA TO", data);
    res.setPreviewData(JSON.parse(data || "{}"));
    console.log("SLUG", path);
    res.redirect(path);
    // ...
  }