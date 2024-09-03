import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scrollToTop from "../utils/scrollToTop";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";

type TQuery = {
  searchTerm?: string;
  page: string;
  limit: string;
  sort?: string;
  priceRange?: string;
  category?: string;
};

const useAllProductsQuery = () => {

    const navigate = useNavigate()

  const [page, setPage] = useState("1");
  const [filter, setFilter] = useState<TQuery>({ page, limit: "8" });
  const [sort, setSort] = useState("");
  const [range, setRange] = useState([0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const queryBuilder = ()=>{
       const queryParams: TQuery = {
         page: page.toString(),
         limit: "8",
       };

       if (searchTerm) {
         queryParams["searchTerm"] = searchTerm;
       }

       if (sort) {
         queryParams["sort"] = sort;
       }

       if (range[0] > 0) {
         queryParams["priceRange"] = range[0].toString();
       }

       if (selectedCategories.length > 0) {
         queryParams["category"] = selectedCategories.join(",");
       }

       
       if (JSON.stringify(queryParams) !== JSON.stringify(filter)) {
           const searchParamsString = new URLSearchParams(
             queryParams as Record<string, string>
           ).toString();
         navigate({ search: searchParamsString });
       }


       
       scrollToTop()
       
       setFilter(queryParams);
  }

   const { data, isLoading, isFetching, isError } =
     useGetAllProductsQuery(filter);


  return {
    page,
    setPage,
    filter,
    setFilter,
    sort,
    setSort,
    range,
    setRange,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    queryBuilder,
    product: { data, isLoading, isFetching, isError },
  };
};

export default useAllProductsQuery;
