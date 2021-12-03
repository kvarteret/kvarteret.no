import { BlurImage } from "dak-components";
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import Vibrant from "node-vibrant";

const CarouselItem = ({ item }) => {
  
  const imageId = item.header.id;
  // const { data, loading, error } = usePalette(`https://cms.kvarteret.no/assets/${imageId}`)
  const [vibrancy, setVibrancy] = useState();
  useEffect(() => {
    const test = async () => {
      if(!Vibrant) return;
      console.log(`https://cms.kvarteret.no/assets/${imageId}?width=5&height=5`)
      Vibrant.from(`https://cms.kvarteret.no/assets/${imageId}?width=5&height=5`).quality(1).getPalette().then( palette => {
        console.log("TEST", palette)

        for(let color in palette) {
          console.log("COLOR", color);
          console.log("TEXT", palette[color].getTitleTextColor())
          console.log("BODY", palette[color].getBodyTextColor())
        }
        setVibrancy(palette);
      });
    }

    test();
  },[setVibrancy])

  return (
    <div className="container">
      <div className="image-container">
        <BlurImage
          className="carousel-image"
          fadeIn
          image={item.header}
          objectFit="cover"
          layout="fill"
        />
        <div className="content">
          <h1>{item.translations[0]?.title}</h1>
          <h2>{item.translations[0]?.description}</h2>
        </div>
      </div>
      <style jsx>
        {`
        .container {
            height: 600px;
            width: 100vw;

        }
          .image-container {
            height: 600px;
            position: relative;
            width: 100vw;
          }

          .content {
            left:50%;
            top: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            z-index: 10000;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            flex-direction: column;
          }
          h1, h2 {
            color: ${vibrancy?.Vibrant.getTitleTextColor() ?? "white"};
   text-shadow: 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"};
            font-size: 60px;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 1200px;
            width: calc(100% - 200px);
            overflow-x: hidden;
            margin: 8px 0;
          }

          h2 {
            font-size: 24px;
            white-space: pre-wrap;
          }
        `}
      </style>
    </div>
  );
};

const Carousel = ({ carouselItems, component }) => {
  return (
    <div className="carousel">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        {carouselItems.map((x, i) => (
          <SwiperSlide key={i}>
            {component && component({item: x})
            || <CarouselItem item={x} />
            }
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>
        {`
          .carousel {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};


export {Carousel};
