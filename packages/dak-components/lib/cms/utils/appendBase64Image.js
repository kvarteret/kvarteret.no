import { getPlaiceholder } from "plaiceholder";

  const appendBase64ImageRecursive = (data) => {
      if(typeof data !== "object" || !data) return [];
      
      const promises = [];
  
    if(data["__typename"] === "directus_files" && (data?.type?.startsWith("image") || false)) {
      promises.push((async () => {
        const { base64, img } = await getPlaiceholder(
          `https://cms.kvarteret.no/assets/${data.id}?width=12&height=12`,
          { size: 12 }
        );
        data.base64 = base64;
      })())
    }

    if(data["__typename"] === "studentBergen" ) {
      
      promises.push((async () => {
        const { base64, img } = await getPlaiceholder(
          `https://d2uipiolnw1m5l.cloudfront.net/media/rc/${data.id}`,
          { size: 12 }
        );
        data.base64 = base64;
      })())
    }
  
    for (const key in data) {
      if (Array.isArray(data[key])) {
        for (const item of data[key]) {
          promises.push(...appendBase64ImageRecursive(item));
        }
        continue;
      }
  
      if(typeof data[key] === "object") {
        promises.push(...appendBase64ImageRecursive(data[key]));
      }
    }
    return promises;
  };

  const appendBase64Image = async data => {
    if(!data) return data;
      const deepCopy = JSON.parse(JSON.stringify(data));
      await Promise.all(appendBase64ImageRecursive(deepCopy));
      return deepCopy;
  }

export default appendBase64Image;