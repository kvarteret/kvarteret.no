import { Carousel } from "./Carousel";
import { BlurImage } from "dak-components";

const CarouselComponent = ({ item, objectFit, layout, height, width }) => {
  return (
    <div className="container">
      <BlurImage
        className="carousel-image"
        fadeIn
        image={item}
        objectFit={objectFit || "contain"}
        width={!layout ? 500 : width}
        height={!layout ? 350 : height}
        layout={layout || "responsive"}
      />
    </div>
  );
};

const GallerySection = ({ gallery, objectFit, layout, width, height }) => {
  const images = gallery
    ?.filter((x) => x.directus_files_id)
    ?.map((x) => x.directus_files_id);
  if (images.length === 1) {
    return <CarouselComponent layout={layout} width={width} height={height} objectFit={objectFit} item={images[0]} />;
  }

  return (
    <Carousel
      carouselItems={gallery
        ?.filter((x) => x.directus_files_id)
        ?.map((x) => x.directus_files_id)}
      component={CarouselComponent}
    />
  );
};

export default GallerySection;
