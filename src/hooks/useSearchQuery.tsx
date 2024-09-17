import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TQueryParams, TUrlQueryParams } from "../types/global.type";
import { DateObject } from "react-multi-date-picker";
import dayjs from "dayjs";
import scrollToTop from "../utils/scrollToTop";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const useSearchQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(1);

  const [carBrand, setCarBrand] = useState<string[]>([]);
  const [carType, setCarType] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [dateTime, setDateTime] = useState<Date[] | DateObject[]>([
    today,
    tomorrow,
  ]);

  const [query, setQuery] = useState<TQueryParams>([]);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);

    if (queryParams.carBrand) {
      const carBrandsArray = (queryParams?.carBrand as string)?.split(",");
      setCarBrand(carBrandsArray);
    }

    if (queryParams.page) {
      setPage(Number(queryParams.page));
    }

    if (queryParams.carType) {
      const carTypesArray = (queryParams?.carType as string)?.split(",");
      setCarType(carTypesArray);
    }

    if (queryParams.priceRange) {
      setPriceRange((queryParams.priceRange as string).split(",").map(Number));
    }

    if (queryParams.startDate && queryParams.endDate) {
      setDateTime([
        new Date(queryParams.startDate as string),
        new Date(queryParams.endDate as string),
      ]);
    }
  }, []);

  useEffect(() => {
    const queryParams: TUrlQueryParams = {
      page,
      startDate: dayjs(dateTime[0] as Date).format("YYYY-MM-DDTHH:mm"),
      endDate: dayjs(dateTime[1] as Date).format("YYYY-MM-DDTHH:mm"),
    };

    if (carBrand.length) queryParams["carBrand"] = carBrand.join(",");
    if (carType.length) queryParams["carType"] = carType.join(",");
    if (priceRange.length) queryParams["priceRange"] = priceRange.join(",");

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(queryParams, { arrayFormat: "comma" }),
    });

    const queryKeys = Object.keys(queryParams)

    const carTypeQuery = queryKeys.includes("carType") ? carType.map(car=> ({name:"carType", value : car})) : []
    const carBrandQuery = queryKeys.includes("carBrand") ? carBrand.map(car=> ({name:"name", value : car})) : []
    const priceRangeQuery = priceRange.length
      ? [{ name: "priceRange", value: queryParams.priceRange }]
      : [];
    

      if(page===query.find(q=> q.name === "page")?.value){
       setPage(1)
      }
    
    const databaseQuery = [
      { name: "page", value: page },
      { name: "limit", value: 6 },
      { name: "startDate", value: queryParams.startDate },
      { name: "endDate", value: queryParams.endDate },
      ...carTypeQuery,...carBrandQuery,...priceRangeQuery
    ];

    

    setQuery(databaseQuery)
  
  }, [page,carType, carBrand, priceRange, dateTime]);

  useEffect(()=>{
    scrollToTop()
  },[page])


  


  // Clear filters and reset URL
  const handleClear = () => {
    setCarType([]);
    setCarBrand([]);
    setPriceRange([0, 0]);
    setDateTime([today, tomorrow]);
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };

  return {
    carType,
    carBrand,
    priceRange,
    dateTime,
    page,
    setPage,
    setCarBrand,
    setCarType,
    setDateTime,
    setPriceRange,
    handleClear,
    query,
  };
};

export default useSearchQuery;
