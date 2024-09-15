import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DateTimePicker from "./DateTimePicker";
import dayjs from "dayjs";
import { FaCalendarAlt, FaClock, FaCar, FaDollarSign } from "react-icons/fa";
import { MdClear, MdSearch } from "react-icons/md";
import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";
import { DateObject } from "react-multi-date-picker";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const priceRanges = [
  { label: "$5 - $50", value: [5, 50] },
  { label: "$51 - $100", value: [51, 100] },
  { label: "$101 - $200", value: [101, 200] },
];

export default function SearchBar() {
  const { data } = useGetAllCarsQuery([{ name: "fields", value: "name" }]);
  const navigate = useNavigate();
  const location = useLocation();

  const [carBrand, setCarBrand] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [dateTime, setDateTime] = useState<Date[] | DateObject[]>([
    today,
    tomorrow,
  ]);

  const cars = data?.data;
  const carBrands = [...new Set(cars?.map((car) => car.name))];
  const { destinationInfo } = useAppSelector(selectLocation);

  // Parse URL query parameters and sync state with them
  useEffect(() => {
    const queryParams = queryString.parse(location.search);

    if (queryParams.carBrand) {
       const carBrandsArray = (queryParams?.carBrand as string)?.split(",");
       setCarBrand(carBrandsArray)
    }

    if (queryParams.priceRange) {
      setPriceRange(queryParams.priceRange.split(",").map(Number));
    }

    if (queryParams.startDate && queryParams.endDate) {
      setDateTime([
        new Date(queryParams.startDate as string),
        new Date(queryParams.endDate as string),
      ]);
    }
  }, []);

  useEffect(()=>{
    const queryParams = {
      carBrand: carBrand.join(","), // Update to handle multiple car brands
      priceRange: priceRange.join(","),
      startDate: dayjs(dateTime[0] as Date).format("YYYY-MM-DDTHH:mm"),
      endDate: dayjs(dateTime[1] as Date).format("YYYY-MM-DDTHH:mm"),
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(queryParams, { arrayFormat: "comma" }),
    });
  },[carBrand,priceRange,dateTime])

  // Clear filters and reset URL
  const handleClear = () => {
    setCarBrand([]);
    setPriceRange([0, 0]);
    setDateTime([today, tomorrow]);
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };

  // Handle selecting/deselecting car brands
  const handleCarBrand = (brand: string) => {
  const filter = carBrand.filter((car) => car !== brand);

  if (!carBrand.includes(brand)) {
    setCarBrand([...carBrand, brand]);
  } else {
    setCarBrand([...filter]);
  }
   
  };

  // Handle selecting price range
  const handlePriceRange = (range: number[]) => {
    setPriceRange(range);
   
  };

  const handleSearch = () => {
   
  };

  return (
    <motion.div
      layout
      onClick={() => setShowDatePicker(false)}
      className="flex flex-col gap-4 p-6 bg-background backdrop-blur rounded-lg shadow-md h-min"
    >
      {/* Date & Time Picker Section */}
      <div className="flex gap-3">
        <div onClick={(e) => e.stopPropagation()} className="space-y-2">
          <Label className="font-medium text-lg">
            <FaCalendarAlt className="inline-block text-primary mr-2" />
            Set Trip Duration
          </Label>

          <motion.div
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="relative z-20 flex gap-4 p-2 border rounded-lg cursor-pointer bg-background transition w-full"
          >
            <div className="flex items-center gap-2 bg-zinc-200 p-2 rounded-lg hover:scale-105 duration-300">
              <FaClock className="text-primary" />
              <p className="text-gray-700">
                Pick-up:{" "}
                <span className="font-semibold text-primary">
                  {dayjs(dateTime[0] as Date).format("MMM D, YYYY [at] h:mm A")}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 bg-zinc-200 p-2 rounded-lg hover:scale-105 duration-300">
              <FaClock className="text-primary" />
              <p className="text-gray-700">
                Return:{" "}
                <span className="font-semibold text-primary">
                  {dayjs(dateTime[1] as Date).format("MMM D, YYYY [at] h:mm A")}
                </span>
              </p>
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
            {showDatePicker && (
              <DateTimePicker
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                dateTime={dateTime as DateObject[]}
                setDateTime={setDateTime}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Price Range Section */}
        <div>
          <Label className="font-medium text-lg">
            <FaDollarSign className="inline-block text-primary mr-2" />
            Price Range (per hour)
          </Label>
          <motion.div
            layout
            className="flex space-x-2 mt-2 border rounded-lg p-2"
          >
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handlePriceRange(range.value)}
                className={`${
                  range.value.every((v, i) => v === priceRange[i]) // Fix price range comparison
                    ? "text-white"
                    : "text-slate-300 bg-zinc-800 hover:text-slate-200 hover:bg-slate-700"
                } transition-colors p-2 rounded-md relative`}
              >
                <span className="relative z-10"> {range.label}</span>
                {range.value.every((v, i) => v === priceRange[i]) && (
                  <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-primary rounded-md"
                  ></motion.span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        {/* Car Brand Section */}
        <div className="w-full">
          <Label className="font-medium text-lg">
            <FaCar className="inline-block text-primary mr-2" />
            Car Brand
          </Label>
          <div className="flex gap-2 mt-2">
            {carBrands.map((brand) => (
              <Button
                key={brand}
                type="button"
                variant="outline"
                className={`border-primary rounded-full px-4 py-1 hover:bg-primary hover:text-white transition ${
                  carBrand.includes(brand)
                    ? "!bg-primary text-white"
                    : "text-primary"
                }`}
                onClick={() => handleCarBrand(brand)}
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="text-gray-600 hover:bg-gray-200 flex items-center gap-2"
          >
            <MdClear />
            Clear
          </Button>
          <Button
            type="button"
            className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
            onClick={handleSearch}
          >
            <MdSearch />
            Search
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
