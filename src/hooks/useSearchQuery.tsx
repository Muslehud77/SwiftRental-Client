import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TQueryParams, TUrlQueryParams } from "../types/global.type";

import dayjs from "dayjs";
import scrollToTop from "../utils/scrollToTop";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearDestination, selectLocation, setTripTime } from "../redux/features/Map/mapSlice";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const useSearchQuery = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch()
  const {tripTime} =useAppSelector(selectLocation)

  const dateTime = tripTime

  const setDateTime = (dates:[Date,Date]) =>{
    dispatch(setTripTime(dates))
  }

  const [page, setPage] = useState(1);
    const [startFetching,setStartFetching] = useState(true)
   const [showDatePicker, setShowDatePicker] = useState(false);
  const [carBrand, setCarBrand] = useState<string[]>([]);
  const [carType, setCarType] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState<number[]>([]);
 

  const [query, setQuery] = useState<TQueryParams>([]);

  useEffect(() => {
     
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      dispatch(
        setTripTime([
          new Date(queryParams.startDate as string),
          new Date(queryParams.endDate as string),
        ])
      );
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
      {name:"isDeleted",value:false},
      { name: "page", value: page },
      { name: "limit", value: 6 },
      { name: "startDate", value: queryParams.startDate },
      { name: "endDate", value: queryParams.endDate },
      ...carTypeQuery,...carBrandQuery,...priceRangeQuery
    ];

    
    setStartFetching(false)
    setQuery(databaseQuery as TQueryParams)
  
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
    dispatch(clearDestination())
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
    showDatePicker,
    setShowDatePicker,
    startFetching,
  };
};

export default useSearchQuery;
