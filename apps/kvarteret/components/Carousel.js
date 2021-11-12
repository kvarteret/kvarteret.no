import { BlurImage } from "dak-components";
import {useState} from "react";


const CarouselItem = ({ item, index, selectedIndex }) => {
  const texts = item.translations[0];
  const visible = index == selectedIndex;
  return (
    <div className="carousel-item">
      <div className="image-container">
        <BlurImage
          className="carousel-image"
          fadeIn
          image={item.image}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="content-wrapper">
        <div className="content-container">
            <div className="content">
            {texts?.title}aøwsdjalksjdlkasjdlkajsdlkjasdolkjaslkdjaslkdjalksjdlkasjd</div>

            </div>
      </div>
      <style jsx>
        {`
          .carousel-item {
            top: 0;
            left: ${(index - selectedIndex) * 100}%;
            position: absolute;
            z-index: 100;
            height: 600px;
            width: 100%;
            transition: left 500ms;
            display: ${visible ? "block" : "none"};
          }

          .content-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            box-shadow: inset 0 -40px 20px -20px #fff;
            background-color: rgba(0,0,0,0.33)
          }
          .content-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            color: white;
            font-size: 80px;
          }

          .content {
              max-width: 1000px;
              overflow: hidden;
              word-wrap: normal;
              text-overflow: ellipsis;
          }
            @media(max-width: 992px) {
              .content {
                max-width: 600px;
                font-size: 60px;
              }
            }
            @media(max-width: 768px) {
              .content {
                max-width: 550px;
                font-size: 50px;
              }
            }

          .image-container {
            position: absolute;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

const Carousel = ({ carouselItems }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
  // TODO: Make left and right selctors prettier
  return (
    <div className="carousel">
      {carouselItems.map((x, i) => (
        <CarouselItem key={i} item={x} index={i} selectedIndex={selectedIndex} />
      ))}
        <div className="selector-container">
            <div className="selector left-selector" onClick={() => setSelectedIndex((selectedIndex-1 + carouselItems.length) % carouselItems.length)}>&lt;</div>
            <div className="space"></div>
            <div className="selector right-selector" onClick={() => setSelectedIndex((selectedIndex+1) % carouselItems.length)}>&gt;</div>
        </div>
        <style jsx>
            {`
            .carousel {
                position: relative;
                height: 600px;
                width: 100%;
            }
            .selector-container {
                position: absolute;
                display: flex;
                flex-direction: row;
                height: 100%;
                width: 100%;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                color: white;
                gap: 20px;
            }
            .space {
                width: 1000px;
            }
            @media(max-width: 992px) {
              .space {
                max-width: 600px;
              }
            }
            @media(max-width: 768px) {
              .space {
                max-width: 550px;
              }
            }


            .selector {
                cursor: pointer;
                font-size: 32px;
                user-select: none;
            }
            `}
        </style>
    </div>
  );
};

export default Carousel;
