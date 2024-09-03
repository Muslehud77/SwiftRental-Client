import { Skeleton } from "../ui/skeleton";

const SkeletonCards = () => {
  const arr = [...Array(8).keys()].map((i) => i + 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {arr.map((e) => (
        <Skeleton key={e} className="rounded-lg shadow-lg overflow-hidden h-96 w-62" />
      ))}
    </div>
  );
};

export default SkeletonCards;
