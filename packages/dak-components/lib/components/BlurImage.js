import React, { useState } from "react";
import Image from "next/image";

export function BlurImage(props) {
  const imageId = props.imageId || props.image?.id;
  const base64 = props.base64 || props.image?.base64;
  if (!imageId && !base64) return <></>;
  const origin = props.image?.__typename;
  const data = { ...props };
  delete data.imageId;
  delete data.image;
  delete data.fadeIn;
  delete data.noLoad;
  const customLoader = ({ src, width, quality }) => {
    if (origin === "firestore") {
      // Firestore events store the full URL directly
      return src;
    }

    if (origin === "directus_files") {
      if (props.transformKey) {
        return `https://cms.kvarteret.no/assets/${src}?key=${props.transformKey}`;
      }
      return `https://cms.kvarteret.no/assets/${src}?width=${width}&quality=${
        quality || 75
      }`;
    }
  };

  return (
    <>
      <Image
        src={imageId}
        loader={customLoader}
        className="blur-image"
        {...data}
      />
      <style jsx global>
        {`
          .blur-image {
            transition: 0.3s;
          }
        `}
      </style>
    </>
  );
}
