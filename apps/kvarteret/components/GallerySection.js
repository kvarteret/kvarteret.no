import { Carousel } from "./Carousel";
import { BlurImage } from "dak-components";

const CarouselComponent = ({item}) => {
    return <div className="container">
      <BlurImage 
            className="carousel-image"
            fadeIn
            image={item}
            objectFit="cover"
            layout="fill"/>
      <style jsx>
        {`
        .container {
          width: 100%;
          height: 350px;
          min-height: 350px;
        }
        `}
      </style>
    </div>
  }

const GallerySection = ({gallery}) => {
    return <Carousel carouselItems={gallery?.map(x=>x.directus_files_id)} component={CarouselComponent} />
}

export default GallerySection;