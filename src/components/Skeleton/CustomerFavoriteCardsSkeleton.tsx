
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";


const CustomerFavoriteCardsSkeleton = () => {
  const skeletonItems = [...Array(6).keys()].map((i) => i + 1);

   const colSpan = (int: number) => {
     if (int === 2) {
       return "md:col-span-4";
     }
     if (int === 3) {
       return "md:col-span-8";
     }
     if (int % 2 === 0) {
       return "md:col-span-8";
     } else {
       return "md:col-span-4";
     }
   };
 
  return (
    <section className="space-y-5">
      <div className="mb-4 grid grid-cols-12 gap-4">
        {skeletonItems.map((_, i) => (
          <div key={i} className={`col-span-12 ${colSpan(i)}`}>
            <BounceCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
};

const BounceCardSkeleton = () => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className="group relative min-h-[300px] flex justify-center items-center overflow-hidden rounded-2xl bg-white "
    >
      <Skeleton className="h-96 w-full" />
      <div className="absolute bottom-0 left-4 right-4 top-52 translate-y-8 rounded-t-2xl bg-black/90 p-4 transition-transform duration-200 group-hover:translate-y-4 group-hover:rotate-[2deg] text-white">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-1/2 mx-auto bg-white" />
          <Skeleton className="h-4 w-1/4 mx-auto bg-white" />
          <Skeleton className="h-6 w-1/3 mx-auto bg-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerFavoriteCardsSkeleton;
