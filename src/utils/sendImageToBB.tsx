import axios from "axios";
import toast from "react-hot-toast";
import { generateBlurHash } from "./generateBlurHash"; 

let resolvePromise: (value?: unknown) => void;
let rejectPromise: (reason?: any) => void;

const manualPromise = new Promise((resolve, reject) => {
  resolvePromise = resolve;
  rejectPromise = reject;
});

export const sendImageToBB = async (
  imageData: File | File[] | (File & { url: string; blurHash: string }[])
) => {
  const apiKey = import.meta.env.VITE_IMAGEBB_API;
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  // Start the toast promise
  toast.promise(manualPromise, {
    loading: "Uploading image...",
    success: <b>Image uploaded!</b>,
    error: <b>Could not save.</b>,
  });

  try {
    if (Array.isArray(imageData)) {
      const imageLinks = [] as { url: string; blurHash: string }[];

      for (let i = 0; i < imageData.length; i++) {

       if(imageData[i] instanceof File){
         const formData = new FormData();
         formData.append("image", (imageData[i] as File));

         // Generate BlurHash for each image
         const blurHash = await generateBlurHash((imageData[i] as File));

         const res = await axios.post(url, formData, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         });

         imageLinks.push({ url: res?.data?.data?.url as string, blurHash });
       }else{
         imageLinks.push(imageData[i] as { url: string; blurHash: string });
       }
      }

      resolvePromise();
      return imageLinks;
    }

    const formData = new FormData();
    formData.append("image", imageData);

    // Generate BlurHash for the single image
    const blurHash = await generateBlurHash(imageData);
 

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const photoURL = response.data.data.url as string;

    resolvePromise(); // Resolve the promise after successful upload
    return { url: photoURL, blurHash }; // Return both URL and BlurHash
  } catch (error) {
    console.error("Error uploading image:", error);
    rejectPromise(error); // Reject the promise in case of an error
    throw error;
  }
};
