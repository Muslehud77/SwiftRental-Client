import { Link, useLocation } from "react-router-dom";
import { TCar } from "../../types/global.type";
import ImageWithBlurHash from "../ImageWithBlurHash/ImageWithBlurHash";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { motion } from "framer-motion";

type CarCardProps = {
  car: TCar;
};

const CarCard = ({ car }: CarCardProps) => {
  const location = useLocation();

  

  return (
    <motion.div
      transition={{
        duration: 0.01,
      }}
      key={car._id}
      layoutId={car._id}
      
    >
      <CardContainer >
        <CardBody className="hover:border border-primary/30 w-full h-full md:h-80 bg-transparent backdrop-blur-lg  p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
          {/* Car Image */}
          <CardItem
            translateY={-10}
            translateX={-10}
            className="relative w-full md:w-96 h-auto overflow-hidden rounded-xl"
          >
            <ImageWithBlurHash
              className="rounded-xl overflow-hidden"
              src={car.images[0].url}
              blurHash={car.images[0].blurHash as string}
            />
          </CardItem>

          <div className="flex flex-col justify-between w-full">
            <CardItem translateY={-8} translateX={-8} className="mt-4">
              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                {car.model} - {car.year}
              </h2>
            </CardItem>
            {/* Car Title */}

            {/* Car Description */}
            <CardItem
              translateY={-6}
              translateX={-6}
              className="text-sm sm:text-base text-gray-200 mt-2"
            >
              {car.name} {car.model} - {car.year}
            </CardItem>

            {/* Features */}
            <CardItem
              translateY={-5}
              translateX={-5}
              className="flex flex-wrap gap-2 mt-4"
            >
              {car.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium text-white"
                >
                  {feature}
                </span>
              ))}
            </CardItem>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-4">
              <CardItem
                translateY={-5}
                translateX={-5}
                className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4"
              >
                <div>
                  <p className="text-lg sm:text-xl font-semibold text-primary-foreground">
                    ${car.pricePerDay} / day
                  </p>
                  <p className="text-sm text-gray-300">
                    ${car.pricePerHour} / hour
                  </p>
                </div>
                <span
                  className={`capitalize px-3 py-1 text-sm rounded-full ${
                    !car.availableForTheDateEntered
                      ? "bg-green-500/10 text-green-500 font-semibold"
                      : "bg-red-500/10 text-red-500 font-semibold"
                  }`}
                >
                  {car?.availableForTheDateEntered || "available"}
                </span>
              </CardItem>
              <div className="flex justify-center items-end">
                <CardItem
                  translateY={-4}
                  translateX={-4}
                  className="flex justify-between w-full sm:w-auto"
                >
                  {!car?.availableForTheDateEntered && (
                    <Link
                      to={`/car-details/${car._id}`}
                      state={{ previousLocationPathname: location.search }}
                      className=" animated-button relative flex items-center gap-1 py-1 px-9 border-[1px] border-primary/20 text-base font-semibold rounded-full transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer hover:bg-background/10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="arr-2 absolute w-6 fill-current z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] left-[-25%]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                      </svg>
                      <span className="text uppercase text-white relative z-10 transform -translate-x-3 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                        d e t a i l s
                      </span>
                      <span className="circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primary/50 rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"></span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="arr-1 absolute w-6 fill-current z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] right-4 text-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                      </svg>
                    </Link>
                  )}
                </CardItem>
              </div>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

export default CarCard;

const data = {
  additionalFeatures: [
    { name: "Insurance", price: 10 },
    { name: "GPS", price: 5 },
  ],
  
  bookingDate: "Wed Sep 18 2024 23:09:54 GMT+0800 (China Standard Time)",
  carId: "66ddfd14d8188c4682eaff55",
  destination: "Dhaka, Bangladesh",
  endDate: "Thu Sep 19 2024 23:08:00 GMT+0800 (China Standard Time)",
  origin: "Chittagong, Bangladesh",
  startDate: "Wed Sep 18 2024 23:08:00 GMT+0800 (China Standard Time)",
  totalCost: 575,
};
