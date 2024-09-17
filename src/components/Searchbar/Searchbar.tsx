import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DateTimePicker from "./DateTimePicker";
import dayjs from "dayjs";
import { FaCalendarAlt, FaClock, FaCar, FaDollarSign } from "react-icons/fa";

import { useGetAllCarsQuery } from "../../redux/features/Car/carApi";
import { DateObject } from "react-multi-date-picker";
import { RiCloseLargeFill } from "react-icons/ri";
import MapDirection from "./MapDirection";
const priceRanges = [
  { label: "$5 - $50", value: [5, 50] },
  { label: "$51 - $100", value: [51, 100] },
  { label: "$101 - $200", value: [101, 200] },
];

export default function SearchBar({
  carType,
  carBrand,
  priceRange,
  dateTime,
  setCarBrand,
  setCarType,
  setDateTime,
  setPriceRange,
  handleClear,
}) {
  const { data } = useGetAllCarsQuery([
    { name: "fields", value: "name carType" },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const cars = data?.data;

  const carBrands = [...new Set(cars?.map((car) => car.name))];
  const carTypes = [...new Set(cars?.map((car) => car.carType))];
  

  // Handle selecting/deselecting car brands
  const handleCarBrand = (brand: string) => {
    const filter = carBrand.filter((car) => car !== brand);
    if (!carBrand.includes(brand)) {
      setCarBrand([...carBrand, brand]);
    } else {
      setCarBrand([...filter]);
    }
  };

  const handleCarType = (type: string) => {
    const filter = carType.filter((car) => car !== type);
    if (!carType.includes(type)) {
      setCarType([...carType, type]);
    } else {
      setCarType([...filter]);
    }
  };

  // Handle selecting price range
  const handlePriceRange = (range: number[]) => {
    if (JSON.stringify(range) === JSON.stringify(priceRange)) {
      setPriceRange([]);
    } else {
      setPriceRange(range);
    }
  };

  return (
    <motion.div
      layout
      onClick={() => setShowDatePicker(false)}
      className="flex relative z-10 flex-col md:flex-row gap-4 p-6 bg-transparent backdrop-blur-lg bg-opacity-30 rounded-lg shadow-xl w-full mx-auto border border-ring/20"
    >
      {/* Date & Time Picker Section */}
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          <div
            onClick={(e) => e.stopPropagation()}
            className="space-y-2 w-full"
          >
            <Label className="font-semibold text-lg text-white">
              <FaCalendarAlt className="inline-block text-primary mr-2" />
              Set Trip Duration
            </Label>

            <motion.div
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="relative z-20 flex gap-4 p-3 border border-primary/20 rounded-lg bg-background/60 hover:bg-primary/5 transition w-full"
            >
              <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
                <FaClock className="text-primary" />
                <p className="text-muted-foreground">
                  Pick-up:{" "}
                  <span className="font-semibold text-primary">
                    {dayjs(dateTime[0] as Date).format(
                      "MMM D, YYYY [at] h:mm A"
                    )}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
                <FaClock className="text-primary" />
                <p className="text-muted-foreground">
                  Return:{" "}
                  <span className="font-semibold text-primary">
                    {dayjs(dateTime[1] as Date).format(
                      "MMM D, YYYY [at] h:mm A"
                    )}
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
          <div className="w-full">
            <Label className="font-semibold text-lg text-white">
              <FaDollarSign className="inline-block text-primary mr-2" />
              Price Range (per hour)
            </Label>
            <motion.div
              layout
              className="flex flex-wrap gap-2 mt-2 rounded-lg px-3 py-5 bg-background/60"
            >
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceRange(range.value)}
                  className={`${
                    range.value.every((v, i) => v === priceRange[i])
                      ? "text-white bg-primary"
                      : "bg-muted/30 hover:text-white hover:bg-primary/70"
                  } transition-colors p-3 rounded-md relative`}
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* Car Brand Section */}
          <div className="w-full">
            <Label className="font-semibold text-lg text-white">
              <FaCar className="inline-block text-primary mr-2" />
              Car Brand
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {carBrands.map((brand) => (
                <Button
                  key={brand}
                  type="button"
                  variant="outline"
                  className={`border-primary rounded-full px-4 py-2 hover:bg-primary hover:text-white transition ${
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
          {/* Car Type Section */}
          <div className="w-full">
            <Label className="font-semibold text-lg text-white">
              <FaCar className="inline-block text-primary mr-2" />
              Car Type
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {carTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  className={`border-primary rounded-full px-4 py-2 hover:bg-primary hover:text-white transition ${
                    carType.includes(type)
                      ? "!bg-primary text-white"
                      : "text-primary"
                  }`}
                  onClick={() => handleCarType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MapDirection className="h-[60vh] flex md:hidden" />
      <button
        onClick={handleClear}
        className="self-end relative flex items-center justify-center w-12 h-12  rounded-full shadow-[0_0_0_4px_rgba(180,160,255,0.253)] transition-all duration-300 overflow-hidden group hover:w-20 bg-background hover:rounded-full hover:bg-primary"
      >
        <RiCloseLargeFill className="group-hover:-translate-y-20 transition-all duration-300 text-foreground" />
        <span className="absolute translate-y-20 text-white text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-0">
          Clear
        </span>
      </button>
    </motion.div>
  );
}
