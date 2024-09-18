import { useLocation, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/Car/carApi";
import { motion } from "framer-motion";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { TCar } from "../../types/global.type";


export default function CarDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetCarByIdQuery(id);

  const car = data?.data as TCar;

  const location = useLocation();

  const color = car?.color




  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8 max-w-7xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Car Image Carousel */}
          <motion.div className="md:w-1/2" layoutId={id}>
            <CarDetailsCarousel images={car.images} />
          </motion.div>

          {/* Car Details */}
          <motion.div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <p className="text-sm text-gray-500">
              {car.year} | {car.model} | {car.carType}
            </p>

            <div className="text-gray-700 space-y-2">
              <p className="text-lg font-semibold">Description</p>
              <p>{car.description}</p>

              <div className="flex items-center space-x-4">
                <span className="font-semibold">Color:</span>
                <div className="flex space-x-2">
                  <div
                    style={{backgroundColor:color}}
                    className={`h-6 w-6 rounded-full  border`}
                  />
                  <span>{car.color}</span>
                </div>
              </div>

              <div className="text-lg font-semibold">Features</div>
              <ul className="list-disc list-inside">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <div className="text-lg font-semibold">Pricing</div>
              <p>
                <span className="font-bold text-2xl">${car.pricePerDay}</span>{" "}
                per day
              </p>
              <p>
                <span className="font-bold">${car.pricePerHour}</span> per hour
              </p>
            </div>
              
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all">
              Reserve Now
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
