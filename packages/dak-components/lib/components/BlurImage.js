import React, { useState } from "react";
import Image from "next/image";

export function BlurImage(props) {
  const imageId = props.imageId || props.image?.id;
  const base64 = props.base64 || props.image?.base64;
  if (!imageId && !base64) return <></>;
  const [loading, setLoading] = useState(true);
  const data = { ...props };
  const fadeIn = props.fadeIn;
  delete data.imageId;
  delete data.image;
  delete data.fadeIn;
  delete data.noLoad;
  const customLoader = ({ src, width, quality }) => {
    return `https://cms.kvarteret.no/assets/${src}?width=${width}&quality=${
      quality || 75
    }`;
  };

    return (
      <>
        <Image
          src={imageId}
          loader={customLoader}
          onLoadingComplete={() => setLoading(false)}
          className="blur-image"
          blurDataURL={base64}
          placeholder={base64 ? "blur" : "empty"}
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
