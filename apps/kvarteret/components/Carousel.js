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
      Vibrant.from(`https://cms.kvarteret.no/assets/${imageId}?width=5&height=5`).quality(1).getPalette().then( palette => {
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
          <div className="title">{item.translations[0]?.title}</div>
          <div className="description">{item.translations[0]?.description}</div>
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
            .image-container:after {
              content: "\A";
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.2);
              transition: all 1s;
              -webkit-transition: all 1s;
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
            vertical-align: middle;
            align-items: center;
            width: 100%;
            flex-direction: column;
            cursor: default;
          }
          .title, .description {
            color: ${vibrancy?.Vibrant.getTitleTextColor() ?? "white"};
            font-size: max(40px, calc(60px - ${item.translations[0]?.title.length / 2.0}px));
            text-shadow: 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"};
            max-width: 1200px;
            width: calc(100% - 200px);
            overflow-x: hidden;
            margin: 8px 0;
          }

          .description {
            font-size: 24px;
            white-space: pre-wrap;
          }
          
            @media (max-width: 768px) {
              .title {
                font-size: max(26px, calc(40px - ${item.translations[0]?.title.length / 2.0}px));
                text-overflow: initial;
                overflow-x: initial;
                overflow-wrap: break-word;
              }
              .description {
                font-size: 20px;
                width: 230px;
              }
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
