import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Image as Img } from "../../types/global.type";

const sliderVariants = {
  incoming: (direction:number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction:number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};


const getImageSize  = (image:Img) => {
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

const getImagesWithSize = async (
  images: Img[]
) => {
  const imagesWithSize = (await Promise.all(
    images.map(getImageSize)
  )) as (Img & { width?: number; height?: number })[];
  return imagesWithSize;
};




type TCarDetailsCarouselProps = {
  images: Img[];
};


const CarDetailsCarousel = ({ images }: TCarDetailsCarouselProps) => {
  const [[imageCount, direction], setImageCount] = useState<number[]>([0, 0]);
  const activeImageIndex = wrap(0, images.length, imageCount);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  const [imagesWIthSize,setImagesWithSize] = useState<(Img & {width?:number,height?:number})[]>(images)



 


  // Initialize PhotoSwipe lightbox
  useEffect(() => {

    getImagesWithSize(images).then((updatedImages) => {
     setImagesWithSize(updatedImages); 
    });

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#car-details-carousel",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
    };
  }, [images]);

  const swipeToImage = (swipeDirection:number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo ) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId:number) => {
    let changeDirection
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, (changeDirection as number)]);
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-4 bg-primary/10 rounded-xl backdrop-blur-lg p-6 border border-primary/20 ">
      <div
        id="car-details-carousel"
        className="relative  h-[700px] w-[350px] md:w-full overflow-hidden rounded-xl"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.a
            key={imagesWIthSize[activeImageIndex]._id}
            href={imagesWIthSize[activeImageIndex].url} // For PhotoSwipe
            data-pswp-width={imagesWIthSize[activeImageIndex].width || "1600"} 
            data-pswp-height={imagesWIthSize[activeImageIndex].height || "900"} 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
          >
            <motion.div
              key={imageCount}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="absolute h-full w-full"
            >
              <ImageWithBlurHash
                dragEndHandler={dragEndHandler}
                src={imagesWIthSize[activeImageIndex].url}
                blurHash={imagesWIthSize[activeImageIndex].blurHash}
              />
            </motion.div>
          </motion.a>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 flex justify-center bg-transparent backdrop-blur-xl p-3 rounded-xl">
        {imagesWIthSize.map((image, id) => (
          <div
            key={image._id}
            onClick={() => skipToImage(id)}
            className={`relative h-28 duration-1000 hover:cursor-pointer mr-1 ${
              id === activeImageIndex ? "w-28" : "w-16"
            }`}
          >
            <ImageWithBlurHash
              object="cover"
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
    </div>
  );
};

export default CarDetailsCarousel;
