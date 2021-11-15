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
  
  const imageId = item.image.id;
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
          image={item.image}
          objectFit="cover"
          layout="fill"
        />
        <div className="content">
          <h1>{item.translations?.at(0)?.title}</h1>
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
          }
          h1 {
            color: ${vibrancy?.Vibrant.getTitleTextColor() ?? "white"};
   text-shadow: 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"}, 0 0 2px ${vibrancy?.Muted?.getHex() ?? "black"};
            font-size: 60px;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 1200px;
            width: calc(100% - 200px);
            overflow-x: hidden;
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

// const CarouselItem = ({ item, index, selectedIndex }) => {
//   const texts = item.translations[0];
//   const visible = index == selectedIndex;
//   return (
//     <div className="carousel-item">
//       <div className="image-container">
//         <BlurImage
//           className="carousel-image"
//           fadeIn
//           image={item.image}
//           objectFit="cover"
//           layout="fill"
//         />
//       </div>
//       <div className="content-wrapper">
//         <div className="content-container">
//             <div className="content">
//             {texts?.title}aøwsdjalksjdlkasjdlkajsdlkjasdolkjaslkdjaslkdjalksjdlkasjd</div>

//             </div>
//       </div>
//       <style jsx>
//         {`
//           .carousel-item {
//             top: 0;
//             left: ${(index - selectedIndex) * 100}%;
//             position: absolute;
//             z-index: 100;
//             height: 600px;
//             width: 100%;
//             transition: left 500ms;
//             display: ${visible ? "block" : "none"};
//           }

//           .content-wrapper {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             box-shadow: inset 0 -40px 20px -20px #fff;
//             background-color: rgba(0,0,0,0.33)
//           }
//           .content-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100%;
//             width: 100%;
//             color: white;
//             font-size: 80px;
//           }

//           .content {
//               max-width: 1000px;
//               overflow: hidden;
//               word-wrap: normal;
//               text-overflow: ellipsis;
//           }
//             @media(max-width: 992px) {
//               .content {
//                 max-width: 600px;
//                 font-size: 60px;
//               }
//             }
//             @media(max-width: 768px) {
//               .content {
//                 max-width: 550px;
//                 font-size: 50px;
//               }
//             }

//           .image-container {
//             position: absolute;
//             height: 100%;
//             width: 100%;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// const Carousel = ({ carouselItems }) => {

//     const [selectedIndex, setSelectedIndex] = useState(0);
//   // TODO: Make left and right selctors prettier
//   return (
//     <div className="carousel">
//       {carouselItems.map((x, i) => (
//         <CarouselItem key={i} item={x} index={i} selectedIndex={selectedIndex} />
//       ))}
//         <div className="selector-container">
//             <div className="selector left-selector" onClick={() => setSelectedIndex((selectedIndex-1 + carouselItems.length) % carouselItems.length)}>&lt;</div>
//             <div className="space"></div>
//             <div className="selector right-selector" onClick={() => setSelectedIndex((selectedIndex+1) % carouselItems.length)}>&gt;</div>
//         </div>
//         <style jsx>
//             {`
//             .carousel {
//                 position: relative;
//                 height: 600px;
//                 width: 100%;
//             }
//             .selector-container {
//                 position: absolute;
//                 display: flex;
//                 flex-direction: row;
//                 height: 100%;
//                 width: 100%;
//                 justify-content: center;
//                 align-items: center;
//                 z-index: 1000;
//                 color: white;
//                 gap: 20px;
//             }
//             .space {
//                 width: 1000px;
//             }
//             @media(max-width: 992px) {
//               .space {
//                 max-width: 600px;
//               }
//             }
//             @media(max-width: 768px) {
//               .space {
//                 max-width: 550px;
//               }
//             }

//             .selector {
//                 cursor: pointer;
//                 font-size: 32px;
//                 user-select: none;
//             }
//             `}
//         </style>
//     </div>
//   );
// };

export default Carousel;
