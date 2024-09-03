
import { FaArrowRight } from "react-icons/fa6";
import { Skeleton } from "../ui/skeleton";

const SpotlightSkeleton = () => {
  const skeletonItems = [1, 2, 3]; 

  return (
    <div className="flex flex-wrap w-full justify-between items-center text-white">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="h-[40vh] w-96 relative rounded-xl bg-gray-700 overflow-hidden animate-pulse"
        >
          <div className="h-full w-full bg-gray-800 absolute inset-0">
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-end p-5">
                <span className="bg-gray-700 rounded-full p-2">
                  <FaArrowRight className="text-gray-600" />
                </span>
              </div>

              <div className="bg-gradient-to-b from-transparent to-gray-800 p-5 space-y-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-1 items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpotlightSkeleton;
