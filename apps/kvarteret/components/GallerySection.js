import { Carousel } from "./Carousel";
import { BlurImage } from "dak-components";

const CarouselComponent = ({ item }) => {
  return (
    <div className="container">
      <BlurImage
        className="carousel-image"
        fadeIn
        image={item}
        objectFit="contain"
        width={500}
        height={350}
        layout="responsive"
      />
    </div>
  );
};

const GallerySection = ({ gallery }) => {
  const images = gallery
    ?.filter((x) => x.directus_files_id)
    ?.map((x) => x.directus_files_id);
  if (images.length === 1) {
    return <CarouselComponent item={images[0]} />;
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
