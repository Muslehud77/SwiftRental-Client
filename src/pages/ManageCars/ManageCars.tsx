import { Helmet } from "react-helmet-async";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";

import ManageProductCard from "../../components/Card/ManageProductCard";
import { Pagination } from "../../components/ui/pagination";
import { Paginate } from "../../components/Pagination/Pagination";
import { TMeta } from "../../types/global.type";
import { useState } from "react";
import MapDirection from "../../components/Searchbar/MapDirection";

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function ManageCars() {
  const [page, setPage] = useState(1);

  const {
    data: data,
    isLoading,
    isError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
  ]);

  const meta = data?.meta || ({} as TMeta);

  const cars = data?.data;

  return (
    <div className="p-6 mx-auto rounded-xl text-foreground bg-background/50 mb-10">
      <Helmet>
        <title>Dashboard | Manage Products</title>
      </Helmet>
      <div className="mb-6 space-y-5">
        <h1 className="text-3xl font-semibold">Manage Products</h1>

        <div className="w-full grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4  gap-5">
          {isLoading || isError ? (
            <></>
          ) : (
            <>
              {cars?.map((car) => (
                <ManageProductCard key={car._id} car={car} />
              ))}
            </>
          )}
        </div>
        <Paginate meta={meta} setPage={setPage} />
      </div>
    </div>
  );
}
