import { Helmet } from "react-helmet-async";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";
import ManageProductCard from "../../components/Card/ManageProductCard";
import { Paginate } from "../../components/Pagination/Pagination";
import { TMeta } from "../../types/global.type";
import { useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";

export default function ManageCars() {
  const [page, setPage] = useState(1);

  const {
    data: data,
    isLoading,
    isError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
    { name: "isDeleted", value: true },
  ]);

  const meta = data?.meta || ({} as TMeta);
  const cars = data?.data;

  return (
    <div className="p-6 mx-auto rounded-xl text-foreground bg-background/50 mb-10">
      <Helmet>
        <title>Dashboard | Deleted Cars</title>
      </Helmet>
      <div className="mb-6 space-y-5">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Deleted Cars
        </h1>

        <div className="w-full grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {isLoading || isError ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-96 max-w-sm mx-auto" />
            ))
          ) : cars?.length ? (
            <>
              {cars.map((car) => (
                <ManageProductCard key={car._id} car={car} />
              ))}
            </>
          ) : (
            <p className="text-center col-span-full text-xl">
              There are no deleted cars available.
            </p>
          )}
        </div>

        {!isLoading && !isError && cars?.length > 0 && (
          <Paginate meta={meta} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
