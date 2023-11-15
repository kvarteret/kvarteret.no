import { FC } from "react";
import { Carousel } from "./Carousel";
import { BlurImage } from "dak-components";

interface CarouselComponentProps {
  item: string;
  objectFit?: string;
  layout?: string;
  height?: number;
  width?: number;
}

const CarouselComponent: FC<CarouselComponentProps> = ({
  item,
  objectFit,
  layout,
  height,
  width,
}) => {
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

interface GallerySectionProps {
  gallery: { directus_files_id: string }[];
  objectFit?: string;
  layout?: string;
  width?: number;
  height?: number;
}

const GallerySection: FC<GallerySectionProps> = ({
  gallery,
  objectFit,
  layout,
  width,
  height,
}) => {
  const images = gallery
    ?.filter((x) => x.directus_files_id)
    ?.map((x) => x.directus_files_id);
  if (images.length === 1) {
    return (
      <CarouselComponent
        layout={layout}
        width={width}
        height={height}
        objectFit={objectFit}
        item={images[0]}
      />
    );
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
