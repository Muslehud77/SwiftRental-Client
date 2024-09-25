import React, { useState } from "react";
import { useGetMyBookingsQuery } from "../../redux/features/Booking/bookingApi";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { TBooking } from "../../types/global.type";
import BookingActions from "./BookingActions";
import {
  CurrencyDollarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Chip } from "../../components/ui/Chip";
import { Skeleton } from "../../components/ui/skeleton"; // Importing skeleton

// Status tabs for filtering
const statusTabs = ["All", "Pending", "Approved", "Completed", "Rejected"];
const sortOptions = ["Newest", "Oldest"];

const MyBookings = () => {
  const { data, isLoading, isError, refetch } =
    useGetMyBookingsQuery(undefined);
  const bookingData = data?.data || [];

  // State for selected tab and sorting option
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Newest");

  // Filter bookings based on the selected status
  const filteredBookings = bookingData.filter((booking: TBooking) => {
    if (selectedStatus === "All") return true;
    return booking.status === selectedStatus.toLowerCase();
  });

  // Sort bookings based on the selected sorting option
  const sortedBookings = [...filteredBookings].sort(
    (a: TBooking, b: TBooking) => {
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">My Bookings</h1>
        {/* Loading skeleton placeholders */}
        <div className="grid gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-5 p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800/50 backdrop-blur-2xl border border-gray-200 dark:border-gray-700"
            >
              <Skeleton className="h-96 w-full rounded-xl" />
              <div className="w-full">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          We encountered an error while fetching your bookings.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition"
          onClick={refetch}
        >
          Retry
        </button>
        <Link
          className="mt-4 ml-4 inline-block text-primary hover:text-primary-dark transition"
          to="/"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">My Bookings</h1>

      {/* Status Filter and Sort By (Chip Tabs) */}
      <div className="mb-6 flex flex-col gap-5 md:flex-row items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          {statusTabs.map((status) => (
            <Chip
              layoutId={"status-filtering"}
              text={status}
              selected={selectedStatus === status}
              setSelected={setSelectedStatus}
              key={status}
            />
          ))}
        </div>

        {/* Sort By Section */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Sort by:
          </p>
          {sortOptions.map((option) => (
            <Chip
              layoutId={"sort-by"}
              text={option}
              selected={sortBy === option}
              setSelected={setSortBy}
              key={option}
            />
          ))}
        </div>
      </div>

      {/* Booking List */}
      <div className="grid gap-6">
        {sortedBookings.length > 0 ? (
          sortedBookings.map((booking: TBooking) => (
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
                    <p
                      className={`text-lg font-bold flex items-center space-x-2 ${
                        booking.status === "approved"
                          ? "text-green-600"
                          : booking.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      <span className="capitalize">{booking.status}</span>
                    </p>
                  
                      <span className="text-foreground bg-primary/80 px-1 text-xs rounded-xl">{booking.completedPayment && "PAID"}</span>
                
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                      {booking.carId.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 my-4">
                    {booking.additionalFeatures.map(
                      (feature, index: number) => (
                        <span
                          key={index}
                          className="bg-primary/40 text-white/80 backdrop-blur-lg border border-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature.name} ${feature.price}
                        </span>
                      )
                    )}
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3">
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
                        <CalendarIcon className="h-5 w-5" />
                        <span>Start Date:</span>
                        <span className="font-medium">
                          {new Date(booking.startDate).toLocaleString()}
                        </span>
                      </p>

                      <p className="text-base text-gray-800 dark:text-gray-300 flex items-center space-x-2">
                        <ClockIcon className="h-5 w-5" />
                        <span>End Date:</span>
                        <span className="font-medium">
                          {new Date(booking.endDate).toLocaleString()}
                        </span>
                      </p>
                    </div>

                    {/* Total Cost */}
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-6 w-6 " />
                      <span>Total Cost:</span>
                      <span>${booking.totalCost}</span>
                    </div>
                  </div>

                  <BookingActions booking={booking} />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <svg
              className="w-20 h-20 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 8L16.5 8M8 12H16m-7.25 4H17"
              ></path>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
              No bookings found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Looks like you haven't made any bookings yet.
            </p>
            <Link
              className="mt-6 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition"
              to={"/inventory"}
            >
              Make a Booking
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
