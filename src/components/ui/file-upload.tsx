import { cn } from "../../lib/utils";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoUpload } from "react-icons/go";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai"; // Close icon

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
}: {
  onChange: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles([...files,...imageFiles]);

    onChange([...files, ...imageFiles]);
  };


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    accept: {
      "image/*": [],
    },
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents file dialog from opening
    const filtered = files.filter((_, i) => i !== index);
    setFiles(filtered);
    onChange(filtered);
  };

  const handleSetMainImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents file dialog from opening
    const newFiles = [...files];
    const [mainImage] = newFiles.splice(index, 1);
    setFiles([mainImage, ...newFiles]);
    onChange([mainImage, ...newFiles]);
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
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-lg">
            Upload Image
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your images here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                <AnimatePresence>
                  {files.map((file, idx) => (
                    <motion.div
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1 }}
                      exit={{
                        x: 500,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                      key={"file" + idx}
                      layoutId={
                        idx === 0 ? "file-upload" : "file-upload-" + idx
                      }
                      className={cn(
                        "relative overflow-hidden z-40 rounded-lg",
                        "shadow-md hover:shadow-lg transition-shadow"
                      )}
                      onClick={(e) => handleSetMainImage(idx, e)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        draggable={false}
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {/* Overlay to show Make Main on hover */}
                      {files[0] !== file && (
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: 0.8,
                            backgroundColor: "black",
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
                          initial={{ scale: 0.8 }}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
