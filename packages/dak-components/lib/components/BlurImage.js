import React, { useState } from "react";
import Image from "next/image";


export function BlurImage(props) {
  const imageId = props.imageId || props.image?.id;
  if(!imageId) return <></>;
  const [loading, setLoading] = useState(true);
  const data = { ...props };
  const fadeIn = props.fadeIn;
  delete data.imageId;
  delete data.image;
  delete data.fadeIn;
  
  const customLoader = ({src, width, quality}) => {
      return `https://cms.kvarteret.no/assets/${src}?width=${width}&quality=${quality || 75}`
  }
  // <div className={loading && fadeIn ? "loading" : "loading-complete"}>
  //   <Image
  //     src={`https://cms.kvarteret.no/assets/${imageId}?width=5&height=5&transforms=[["blur",%205]]`}
  //     loader={customLoader}
  //     {...data}
  //   />
  // </div>

  return (
    <>
      <Image
        src={imageId}
        loader={customLoader}
        onLoadingComplete={() => setLoading(false)}
        {...data}
      />
      <style jsx>
        {`
          .loading {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }

          .loading-complete {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
          }
        `}
      </style>
    </>
  );
}
