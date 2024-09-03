import { Skeleton } from "../../components/ui/skeleton";

export default function ManageProductsSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((index) => (
          <div
            key={index}
            className="bg-background rounded-lg shadow-md overflow-hidden"
          >
            <Skeleton className="w-full h-48 object-cover" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex items-center justify-between mt-4">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
