
import { useGetMyBookingsQuery } from "../../redux/features/Booking/bookingApi";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";
import { motion } from "framer-motion";

import {

  CurrencyDollarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";

import { CalendarIcon, ClockIcon } from "lucide-react";
import { TBooking } from "../../types/global.type";
import BookingActions from "./BookingActions";



const MyBookings = () => {
  const { data } = useGetMyBookingsQuery(undefined);
  const bookingData = data?.data;





  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">My Bookings</h1>

      <div className="grid gap-6">
        {bookingData?.map((booking: TBooking) => (
          <motion.div
            key={booking._id}
            transition={{ duration: 0.2 }}
            layoutId={booking._id}
            className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800/50 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Car Image */}
              <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-md">
                <ImageWithBlurHash
                  object="cover"
                  className="rounded-xl overflow-hidden"
                  src={booking.carId.images[0].url}
                  blurHash={booking.carId.images[0].blurHash as string}
                />
              </div>

              {/* Booking Details */}
              <div className="flex flex-col justify-between w-full">
                {/* Car Information */}
                <div>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                    {booking.carId.name} - {booking.carId.model} (
                    {booking.carId.year})
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {booking.carId.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 my-4 b">
                  {booking.additionalFeatures.map((feature, index: number) => (
                    <span
                      key={index}
                      className="bg-primary/40 text-white/80 backdrop-blur-lg border border-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature.name} ${feature.price}
                    </span>
                  ))}
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3">
                  {/* Status */}
                  <p
                    className={`text-lg font-bold flex items-center space-x-2 ${
                      booking.status === "approved"
                        ? "text-green-600"
                        : booking.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    <span>Status:</span>
                    <span className="capitalize">{booking.status}</span>
                  </p>

                  {/* Booking ID */}
                  <p className="text-lg font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                    <IdentificationIcon className="h-5 w-5 text-primary" />
                    <span>Booking ID:</span>
                    <span className="text-gray-600 dark:text-gray-300 font-mono truncate">
                      {booking._id}
                    </span>
                  </p>

                  {/* Start and End Dates */}
                  <div className="flex flex-col md:flex-row justify-between items-start space-y-2 md:space-y-0">
                    <p className="text-base text-gray-800 dark:text-gray-300 flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Start Date:</span>
                      <span className="font-medium">
                        {new Date(booking.startDate).toLocaleString()}
                      </span>
                    </p>

                    <p className="text-base text-gray-800 dark:text-gray-300 flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                      <span>End Date:</span>
                      <span className="font-medium">
                        {new Date(booking.endDate).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {/* Total Cost */}
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span>Total Cost:</span>
                    <span>${booking.totalCost}</span>
                  </div>
                </div>

                      <BookingActions booking={booking}/>
               
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    
    </div>
  );
};

export default MyBookings;
