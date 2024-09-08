import  { useState } from "react";
import { Blurhash } from "react-blurhash";

type ImageWithBlurHashProps = {
  src: string;
  blurHash: string;
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
    <div style={{ position: "relative", width, height }} className={className}>
      {/* Show BlurHash as a placeholder until the image loads */}
      {!imageLoaded && (
        <Blurhash
          hash={blurHash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}

      {/* The actual image */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageWithBlurHash;
