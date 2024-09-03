import { Skeleton } from "../ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <Skeleton className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden h-96" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="border rounded-lg overflow-hidden aspect-square object-cover h-24 w-24" />
          <Skeleton className="border rounded-lg overflow-hidden aspect-square object-cover h-24 w-24" />
          <Skeleton className="border rounded-lg overflow-hidden aspect-square object-cover h-24 w-24" />
          <Skeleton className="border rounded-lg overflow-hidden aspect-square object-cover h-24 w-24" />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-20 w-full" />
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-12 w-32" />
        </form>
      </div>
    </div>
  );
}
