
import { Helmet } from "react-helmet-async";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";

import ManageProductCard from "../../components/Card/ManageProductCard";

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function ManageCars() {
  

  const {data:data,isLoading,isError} = useGetAllCarsQuery([
    {name:"limit",value:9},
  
  
  ])

  const cars = data?.data




  return (
    <div className="px-8 mx-auto py-6 rounded-xl text-foreground bg-background/50 mb-10">
      <Helmet>
        <title>Dashboard | Manage Products</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-5">Manage Products</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3  gap-5">
          {isLoading || isError ? (
            <></>
          ) : (
            <>
              {cars?.map((car) => (
                <ManageProductCard key={car._id} car={car}/>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

