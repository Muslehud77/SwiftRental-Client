import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Image as Img } from "../../types/global.type";
import scrollToTop from "../../utils/scrollToTop";
import { isMobile } from "../../utils/isMobile";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const getImageSize = (image: Img) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      resolve({ ...image, width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ ...image, width: 0, height: 0 }); // fallback in case image fails to load
    };
  });
};

const getImagesWithSize = async (images: Img[]) => {
  const imagesWithSize = (await Promise.all(
    images.map(getImageSize)
  )) ;
  return imagesWithSize as (Img & { width?: number; height?: number })[];
};

type TCarDetailsCarouselProps = {
  images: Img[];
  height:number
};

const CarDetailsCarousel = ({ images ,height}: TCarDetailsCarouselProps) => {
  const [[imageCount, direction], setImageCount] = useState<number[]>([0, 0]);
  const activeImageIndex = wrap(0, images.length, imageCount);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  const [imagesWithSize, setImagesWithSize] =
    useState<(Img & { width?: number; height?: number })[]>(images);

  // Initialize PhotoSwipe lightbox with all images in the gallery
  useEffect(() => {
    scrollToTop();
    getImagesWithSize(images).then((updatedImages) => {
      setImagesWithSize(updatedImages);
    });

    const lightboxItems = imagesWithSize.map((image) => ({
      src: image.url,
      w: image.width || 1600,
      h: image.height || 900,
    }));

    const lightbox = new PhotoSwipeLightbox({
      dataSource: lightboxItems, // Pass the entire array of images to PhotoSwipe
      gallery: "#car-details-carousel",
      children: "a",
      mouseMovePan: true,
      initialZoomLevel: "fit",
      secondaryZoomLevel: 1.5,
      maxZoomLevel: 1,
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
    };
  }, [images]);

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: number) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection as number]);
  };



  

  return (
    <motion.div
      layout
      style={{ height: !isMobile() ? height - 66 : "700px" }}
      className="relative flex justify-center items-center bg-primary/10 rounded-xl backdrop-blur-lg p-6 "
    >
      <div
        id="car-details-carousel"
        className={`relative h-full w-[80vw] md:w-full overflow-hidden rounded-xl`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.a
            href={imagesWithSize[activeImageIndex].url} // For PhotoSwipe
            data-pswp-width={imagesWithSize[activeImageIndex].width || "1600"}
            data-pswp-height={imagesWithSize[activeImageIndex].height || "900"}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            key={imageCount}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            className="absolute h-full w-full"
          >
            <ImageWithBlurHash
              object={!isMobile() ? "cover" : "cover"}
              dragEndHandler={dragEndHandler}
              src={imagesWithSize[activeImageIndex].url}
              blurHash={imagesWithSize[activeImageIndex].blurHash}
            />
          </motion.a>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 flex justify-center bg-transparent backdrop-blur-xl p-3 rounded-xl">
        {imagesWithSize.map((image, id) => (
          <div
            key={image._id}
            onClick={() => skipToImage(id)}
            className={`relative h-28 duration-1000 hover:cursor-pointer mr-1 ${
              id === activeImageIndex ? "w-28" : "w-16"
            }`}
          >
            <ImageWithBlurHash
              object={"cover"}
              src={image.url}
              blurHash={image.blurHash}
            />
            <div
              className={`active-indicator ${
                id === activeImageIndex ? "scale-x-100" : null
              } absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.56,0.03,0.12,1.04)] bg-[#1f1f1f]/50 origin-left scale-x-0 pointer-events-none`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarDetailsCarousel;
