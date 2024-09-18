import { Helmet } from "react-helmet-async";
import MapDirection from "../../components/Searchbar/MapDirection";
import SearchBar from "../../components/Searchbar/SearchBar";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";
import useSearchQuery from "../../hooks/useSearchQuery";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import { Paginate } from "../../components/Pagination/Pagination";
import { Skeleton } from "../../components/ui/skeleton"; // Import Skeleton from shadcn/ui
import CarCardSkeleton from "../../components/Skeleton/CarCardSkeleton";
import CarCard from "../../components/Card/CarCard";
import { isMobile } from "../../utils/isMobile";

export default function Inventory() {
  const {
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
  } = useSearchQuery();

  const { data, isLoading, isError } = useGetAllCarsQuery(query);
  const cars = data?.data;
  const meta = data?.meta;

  return (
    <div onClick={()=>setShowDatePicker(false)} className="container mx-auto px-4 md:px-6 py-8 text-foreground">
      <Helmet>
        <title>AdventureAlly | Products</title>
      </Helmet>
      <div className="flex w-full justify-start gap-5">
         <MapDirection className="h-screen w-96 hidden md:flex" />

        <div className="space-y-4">
          <SearchBar
            carType={carType}
            carBrand={carBrand}
            priceRange={priceRange}
            dateTime={dateTime}
            setCarBrand={setCarBrand}
            setCarType={setCarType}
            setDateTime={setDateTime}
            setPriceRange={setPriceRange}
            handleClear={handleClear}
            showDatePicker={showDatePicker}
    setShowDatePicker={setShowDatePicker}
          />

          <div className="w-full space-y-5">
            {isLoading || isError ? (
              <CarCardSkeleton />
            ) : (
              <>
                {cars?.map((car) => (
                  <CarCard car={car} />
                ))}

                <Paginate meta={meta} setPage={setPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
