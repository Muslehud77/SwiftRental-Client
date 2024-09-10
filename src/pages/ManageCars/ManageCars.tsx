import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";

import scrollToTop from "../../utils/scrollToTop";

import { Helmet } from "react-helmet-async";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function ManageCars() {
  

  const {data:data,isLoading,isError} = useGetAllCarsQuery([{name:"limit",value:9}])

  const cars = data?.data




  return (
    <div className="px-8 mx-auto py-6 border rounded-xl text-foreground bg-background/50 mb-10">
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
                <div
                  key={car._id}
                  className="w-full h-96 max-w-sm mx-auto relative mb-20"
                >
                  <ImageWithBlurHash
                    className="rounded-xl overflow-hidden"
                    src={car.images[0].url}
                    blurHash={car.images[0].blurHash as string}
                  />
                  <div className="w-full flex justify-center">
                    <div className="absolute -bottom-10 w-56 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                      <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                        Nike Revolt
                      </h3>

                      <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          $129
                        </span>
                        <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

