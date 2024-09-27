import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/Car/carApi";
import { AnimatePresence, motion } from "framer-motion";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { TCar } from "../../types/global.type";
import DateTimePicker from "../../components/Searchbar/DateTimePicker";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import dayjs from "dayjs";
import { FaCheckCircle } from "react-icons/fa";

import { Skeleton } from "../../components/ui/skeleton";
import useDecodedToken from "../../hooks/useDecodedToken";

import BookingDialogue from "./BookingDialogue";
import MapDirection from "../../components/Searchbar/MapDirection";

export default function CarDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useDecodedToken();
  const { tripTime } = useAppSelector(selectLocation);
  const { id } = useParams();
  const { data, isLoading } = useGetCarByIdQuery(id);
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<
    { label: string; price: number }[]
  >([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const car = data?.data as TCar;

  const [startDate, endDate] = tripTime;

  const tripDuration = dayjs(endDate).isAfter(dayjs(startDate))
    ? dayjs(endDate).diff(dayjs(startDate), "hour")
    : 0;


  useEffect(() => {
    if (car && tripDuration >= 0) {
      const pricePerDay = car?.pricePerDay || 0;
      const pricePerHour = car?.pricePerHour || 0;

      const basePrice =
        tripDuration >= 24
          ? Math.ceil(tripDuration / 24) * Number(pricePerDay)
          : tripDuration * Number(pricePerHour);

      const featuresPrice = selectedFeatures.reduce((total, feature) => {
        const featureItem = additionalFeatures.find(
          (item) => item.label === feature.label
        );
        return (
          total +
          (featureItem
            ? featureItem.price *
              (tripDuration >= 24 ? Math.ceil(tripDuration / 24) : tripDuration)
            : 0)
        );
      }, 0);

      setTotalPrice(basePrice + featuresPrice);
    }
  }, [tripDuration, selectedFeatures, car]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFeature = (feature: { label: string; price: number }) => {
    if (selectedFeatures.find((f) => f.label === feature.label)) {
      setSelectedFeatures(
        selectedFeatures.filter((item) => item.label !== feature.label)
      );
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = () => {
    if (!user?.role) {
      navigate("/login", { state: pathname });
    }
    if (user?.role === "admin") {
      navigate(`/dashboard/edit-car/${car._id}`);
    } else if (user?.role === "user") {
   
      setDialogueOpen(true);
    }
  };

  const ref = useRef(null);



  return (
    <motion.div
      ref={ref}
      onClick={() => setShowDatePicker(false)}
      layoutId={id}
      className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 p-8 mx-auto"
    >
      {isLoading ? (
        <>
          <motion.div className="w-full md:w-10/12 h-full">
            <Skeleton className="h-[700px] w-full rounded-lg" />
          </motion.div>
          <motion.div className="w-full md:w-1/2 p-6 shadow-lg space-y-4 bg-primary/10 rounded-xl backdrop-blur-lg border border-primary/20">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2 my-4" />
            <Skeleton className="h-20 w-full my-4" />
            <Skeleton className="h-6 w-3/4 my-2" />
            <Skeleton className="h-6 w-1/2 my-2" />
            <Skeleton className="h-40 w-full my-4" />
            <Skeleton className="h-10 w-full my-4" />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div className="w-full md:w-10/12 h-full">
            <CarDetailsCarousel
              height={(ref?.current as unknown as HTMLElement)?.clientHeight}
              images={car.images}
            />
          </motion.div>

          <motion.div className="md:w-1/2 p-6 shadow-lg space-y-4 bg-primary/10 rounded-xl backdrop-blur-lg border border-primary/20">
            <span className="text-4xl font-bold text-white/80">{car.name}</span>
            <p className="text-md text-white/80 bg-black/50 px-2 p-1 rounded-xl">
              {car.year} | {car.model} | {car.carType}
            </p>

            <div className="text-white/80 space-y-4">
              <div>
                <p className="text-lg font-semibold">Description</p>
                <p>{car.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-semibold">Color:</span>
                <div className="flex space-x-2 items-center">
                  <div
                    style={{ backgroundColor: car.color }}
                    className={`h-6 w-6 rounded-full border`}
                  />
                  <span>{car.color}</span>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Features</p>
                <ul className="list-disc list-inside text-white/80">
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <DateTimePicker
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
              />

              <MapDirection className="w-full h-[70vh]" />

              <div>
                <p className="text-lg font-semibold mb-1">
                  Additional Features
                </p>
                <div className="flex flex-wrap gap-4">
                  {additionalFeatures.map((feature) => (
                    <motion.div
                      layout
                      key={feature.label}
                      onClick={() => toggleFeature(feature)}
                      className={`${
                        selectedFeatures.find((f) => f.label === feature.label)
                          ? "bg-primary text-white"
                          : "bg-background text-foreground/80"
                      } font-thin uppercase relative cursor-pointer flex items-center justify-between px-4 py-2 rounded-md shadow transition-colors duration-200`}
                    >
                      <span>
                        {feature.label} ${feature.price}
                      </span>

                      <AnimatePresence>
                        {selectedFeatures.find(
                          (f) => f.label === feature.label
                        ) && (
                          <motion.span>
                            <FaCheckCircle className="text-foreground ml-2" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Pricing</p>
                <span className="text-2xl font-bold text-white">
                  ${totalPrice}
                </span>
                <p className="text-sm text-white/80">
                  Based on {Math.floor(tripDuration / 24)} day(s) and{" "}
                  {tripDuration % 24} hour(s) of trip duration and selected
                  features.
                </p>
              </div>

              {/* Car Policies Section */}
              <div>
                <p className="text-lg font-semibold">Policies</p>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>
                    <strong>Cancellation Policy:</strong> Free cancellation up
                    to 24 hours before the trip starts.
                  </li>
                  <li>
                    <strong>Fuel Policy:</strong> Full to full. The car must be
                    returned with a full tank.
                  </li>
                  <li>
                    <strong>Mileage Limit:</strong> 200 miles per day. Extra
                    miles will incur an additional charge.
                  </li>
                  <li>
                    <strong>Smoking Policy:</strong> Smoking in the vehicle is
                    strictly prohibited.
                  </li>
                  <li>
                    <strong>Pet Policy:</strong> Pets are allowed with prior
                    approval.
                  </li>
                  <li>
                    <strong>Driver Requirements:</strong> The driver must be at
                    least 21 years old with a valid driver’s license.
                  </li>
                </ul>
              </div>

              <style>{steamKeyframes}</style>

              <motion.button
                disabled={totalPrice === 0 ? true : false}
                onClick={handleSubmit}
                className="relative flex items-center justify-center w-full py-3 rounded-[8px] text-white cursor-pointer transition duration-200 bg-primary/40 hover:bg-primary/80 uppercase tracking-widest"
              >
                {user?.role === "admin" ? "Edit this car" : "Reserve now"}
                <span
                  className="absolute inset-0 rounded-[10px] -z-10 blur-[50px]"
                  style={{
                    background:
                      "linear-gradient(45deg, #141414, #1b1b1b, #2e2e2e, #e1e1e1, #2e2e2e, #1b1b1b, #141414)",
                    backgroundSize: "400%",
                    animation: "steam 20s linear infinite",
                  }}
                ></span>
              </motion.button>
            </div>
          </motion.div>
          <BookingDialogue
            car={car}
            dialogueOpen={dialogueOpen}
            setDialogueOpen={setDialogueOpen}
            selectedFeatures={selectedFeatures}
            totalPrice={totalPrice}
            tripDuration={tripDuration}
          />
        </>
      )}
    </motion.div>
  );
}

export const steamKeyframes = `
@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
`;

export const additionalFeatures = [
  { label: "Insurance", price: 10 },
  { label: "GPS", price: 5 },
  { label: "Child Seat", price: 7 },
  { label: "Wi-Fi", price: 8 },
  { label: "Roadside Assistance", price: 15 },
  { label: "Extra Driver", price: 12 },
  { label: "Dashcam", price: 6 },
  { label: "Snow Chains", price: 7 },
  { label: "Roof Rack", price: 10 },
];
