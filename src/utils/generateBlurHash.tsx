import { encode } from "blurhash";

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

const getImageData = (
  image: HTMLImageElement,
  width: number,
  height: number
): ImageData => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(image, 0, 0, width, height);
  return ctx?.getImageData(0, 0, width, height) as ImageData;
};

export const generateBlurHash = async (
  imageFile: File
): Promise<string | null> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onloadend = async () => {
      try {
        const img = await loadImage(fileReader.result as string);
        const imageData = getImageData(img, 32, 32); // Use a smaller size for BlurHash
        const blurHash = encode(
          imageData.data,
          imageData.width,
          imageData.height,
          4,
          4
        );
        resolve(blurHash);
      } catch (err) {
        reject(err);
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsDataURL(imageFile); // Read image as a base64 string
  });
};
