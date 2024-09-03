import { Skeleton } from "../ui/skeleton";

const EditProductSkeleton = () => {

    
  return (
    <div className="grid gap-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-32 w-full" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default EditProductSkeleton;