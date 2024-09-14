import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import {
  selectLocation,
  setDestination,
  setFrom,
} from "../../redux/features/Map/mapSlice";
import { Autocomplete } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLocationName } from "../../utils/locationName";
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import DateTimePicker from "./DateTimePicker";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

type Value = [Date, Date];

const carBrands = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes",
  "Audi",
  "Volkswagen",
  "Nissan",
  "Hyundai",
  "Kia",
];

const priceRanges = [
  { label: "$5 - $50", value: [5, 50] },
  { label: "$51 - $100", value: [51, 100] },
  { label: "$101 - $200", value: [101, 200] },
];

export default function SearchBar() {
  const { destinationInfo } = useAppSelector(selectLocation);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const [dateTime, setDateTime] = useState<Date[]>([today, tomorrow]);

  const { from, mapLoaded } = useAppSelector(selectLocation);
  const dispatch = useDispatch();

  const { register, control, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      origin: originRef?.current?.value,
      destination: destinationInfo.destination,
      dateTime: [today, tomorrow],
      pricePerHour: [8, 200],
      carBrand: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  const handleClear = () => {
    reset();
  };

  const origin = watch("origin");
  const destination = watch("destination");

  const onPlaceChanged = async () => {
    const currentOrigin = originRef?.current?.value;
    const currentDestination = destinationRef?.current?.value;

    if (currentOrigin) {
      setValue("origin", currentOrigin);
    }
    if (currentDestination) {
      setValue("destination", destination);
    }


    const directionService = new google.maps.DirectionsService();
    if (currentOrigin && currentDestination) {
     
      try{
        const results = await directionService.route({
        origin: destinationInfo.origin,
        destination: destinationInfo.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const distance = results.routes[0].legs[0].distance?.text;
      const duration= results.routes[0].legs[0].duration?.text;
      
      console.log(results)

      if (results.routes.length) {
        dispatch(
          setDestination({
            origin: currentOrigin || "",
            destination: currentDestination || "",
            directionResponse: results,
            distance,
            duration,
          })
        );
      }
      }catch(error){
        console.log(error.message)
      }
    }
  };



  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setFrom({ from: { lat: latitude, lng: longitude } }));
          const locationName = (await getLocationName(
            from
          )) as unknown as string;
          dispatch(setDestination({origin:locationName}))
          setValue("origin", locationName);
         await onPlaceChanged()
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-background rounded-lg shadow-md w-5/12"
    >
      {mapLoaded && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="origin">Origin</Label>
            <div className="flex">
              <Autocomplete className="w-full" onPlaceChanged={onPlaceChanged}>
                <Input
                  defaultValue={origin}
                  ref={originRef}
                  placeholder="Enter your origin"
                />
              </Autocomplete>
              <Button
                type="button"
                variant="outline"
                className="ml-2"
                onClick={handleCurrentLocation}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Autocomplete className="w-full" onPlaceChanged={onPlaceChanged}>
              <Input
                defaultValue={destination}
                ref={destinationRef}
                id="destination"
                placeholder="Enter your destination"
              />
            </Autocomplete>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Set Trip Duration</Label>
        <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
      </div>

      <div>
        <Label>Price Range (per hour)</Label>
        <div className="flex space-x-2">
          {priceRanges.map((range) => (
            <Button
              key={range.label}
              type="button"
              variant="outline"
              onClick={() => setValue("pricePerHour", range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label>Car Brand</Label>
        <div className="flex flex-wrap gap-2">
          {carBrands.map((brand) => (
            <Button
              key={brand}
              type="button"
              variant="outline"
              className="rounded-full px-4 py-1"
              onClick={() => setValue("carBrand", brand)}
            >
              {brand}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit">Search</Button>
      </div>
    </motion.form>
  );
}
