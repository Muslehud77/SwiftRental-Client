import { cn } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoUpload } from "react-icons/go";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import ImageWithBlurHash from "../ImageWithBlurHash/ImageWithBlurHash";

export type TImageType =
  | { url: string; blurHash: string }[]
  | (
      | { url: string; blurHash: string }
      | (File & { url: string; blurHash: string })
    )[];

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({
  onChange,
  imageUrls,
}: {
  onChange: (files: TImageType) => void;
  imageUrls?: { url: string; blurHash: string }[];
}) => {
  const [files, setFiles] = useState<TImageType>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUrls?.length) {
      setFiles([...files, ...imageUrls]);
    }
  }, [imageUrls]);

  const handleFileChange = (newFiles: File[]) => {
   
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const updatedFiles = [...files, ...imageFiles] as TImageType;
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    accept: { "image/*": [] },
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents file dialog from opening
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleSetMainImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents file dialog from opening
    const newFiles = [...files];
    const [mainImage] = newFiles.splice(index, 1);
    const updatedFiles = [mainImage, ...newFiles];
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };
  const secondaryVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const imagePrev = (image: File | { url: string; blurHash: string }) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      return image.url;
    }
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          multiple
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-lg">
            Upload Image
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your images here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-2xl mx-auto duration-500">
            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-4 duration-500 transition-all">
                <AnimatePresence>
                  {files.map((file , idx) => (
                    <motion.div
                      layout
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.1 }}
                      exit={{
                        width: 0,
                        transition: { duration: 0.2 },
                      }}
                      layoutId={idx === 0 ? "file-upload" : "file" + idx}
                      key={(file as File)?.name || file.url} // Use file name or any unique identifier
                      className={cn(
                        "relative overflow-hidden z-40 rounded-lg",
                        "shadow-md hover:shadow-lg transition-shadow"
                      )}
                      onClick={(e) => handleSetMainImage(idx, e)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ImageWithBlurHash
                        className="!h-56 bg-foreground"
                        src={imagePrev(file)}
                        blurHash={file?.blurHash || ""}
                      />

                      {files[0] !== file && (
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          style={{ backgroundColor: "black" }}
                          whileHover={{
                            opacity: 0.8,
                          }}
                          onClick={(e) => handleSetMainImage(idx, e)}
                        >
                          <p className="text-white font-bold text-sm">
                            Make Main
                          </p>
                        </motion.div>
                      )}
                      {/* Close icon for removing images */}
                      <motion.button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-white dark:bg-neutral-800 text-red-500 rounded-full"
                        onClick={(e) => handleRemoveImage(idx, e)}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AiOutlineClose className="h-5 w-5" />
                      </motion.button>
                      {/* Highlighting the main image */}
                      {idx === 0 && (
                        <motion.span
                          layoutId="mainImage"
                          initial={{ scale: 0.2 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-md"
                        >
                          Main Image
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <GoUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <GoUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
