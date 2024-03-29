import { getPlaiceholder } from "plaiceholder";
import { Media } from "../queries/events";

const appendBase64ImageRecursive = (data: Media | any) => {
  if (typeof data !== "object" || !data) return [];

  const promises: Promise<void>[] = [];

  if (
    data["__typename"] === "directus_files" &&
    (data?.type?.startsWith("image") || false)
  ) {
    promises.push(
      (async () => {
        if (!data.id) return;
        try {
          const { base64 } = await getPlaiceholder(
            `https://cms.kvarteret.no/assets/${data.id}?width=12&height=12`,
            { size: 6 }
          );
          data.base64 = base64;
        } catch (err) {
          console.error(
            "Failed to download image from Directus CMS! Kafaen har skjedd no??? - Error"
          );
        }
      })()
    );
  }

  if (data["__typename"] === "studentBergen") {
    promises.push(
      (async () => {
        if (!data.id) return;
        try {
          const { base64 } = await getPlaiceholder(
            `https://d1juzv6t6mkm1f.cloudfront.net/media/rc/${data.id}`,
            { size: 6 }
          );
          data.base64 = base64;
        } catch (err) {
          console.error(
            "Failed to download image from cloudfront! Kafaen har skjedd no??? - Error"
          );
        }
      })()
    );
  }

  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const item of data[key]) {
        promises.push(...appendBase64ImageRecursive(item));
      }
      continue;
    }

    if (typeof data[key] === "object") {
      promises.push(...appendBase64ImageRecursive(data[key]));
    }
  }
  return promises;
};

const appendBase64Image = async <T = any>(data: T) => {
  if (!data) return data;
  const deepCopy = JSON.parse(JSON.stringify(data));
  await Promise.all(appendBase64ImageRecursive(deepCopy));
  return deepCopy as T;
};

export default appendBase64Image;
