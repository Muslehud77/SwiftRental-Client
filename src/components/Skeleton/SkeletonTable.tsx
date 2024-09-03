import { Skeleton } from "../ui/skeleton";

const SkeletonTable = () => {
  const arr = [...Array(10).keys()].map((i) => i + 1);

  return (
    <div className="overflow-hidden  p-5">
      <div className="p-10 bg-secondary rounded-xl">
        <div className="flex flex-col justify-center h-full items-center gap-5">
          {arr.map((e) => (
            <div
              key={e}
              className="grid gap-5 justify-center items-center pb-10"
            >
              <Skeleton className="h-10 w-[90vw] " />
              <Skeleton className="h-2 w-[70vw]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
