import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

type ImageWithBlurHashProps = {
  src: string;
  blurHash?: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  className?: string;
};

const ImageWithBlurHash = ({
  src,
  blurHash,
  width = "100%",
  height = "100%",
  alt = "",
  className = "",
}: ImageWithBlurHashProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // When the image is loaded, set imageLoaded to true
  const handleImageLoad = () => {
    setImageLoaded(true);
  };



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: "relative", width, height }}
        className={className}
      >
        {/* Blurhash */}
        {blurHash && !imageLoaded ? (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: imageLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Blurhash
                hash={blurHash}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </>
        ) : (
          <></>
        )}

        {/* The actual image */}
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 2 }}
          onLoad={handleImageLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageWithBlurHash;
