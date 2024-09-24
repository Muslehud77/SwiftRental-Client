import React, { useState } from "react";
import { useGetMyBookingsQuery } from "../../redux/features/Booking/bookingApi";
import { TBooking } from "../../types/global.type";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../../components/ui/table";
import { motion } from "framer-motion";
import { Chip } from "../../components/ui/Chip"; // Importing Chip for sorting
import { Skeleton } from "../../components/ui/skeleton"; // Skeleton for loading state
import BookingActions from "../MyBookings/BookingActions";


// Define sort options with corresponding labels
const sortOptions = [
  { value: "createdAt", label: "Booking Date" },
  { value: "startDate", label: "Start Date" },
  { value: "endDate", label: "End Date" },
  { value: "totalCost", label: "Total Cost" },
  { value: "paymentStatus", label: "Payment Status" }, // New sorting option
];

const Payments = () => {
  const { data, isLoading, isError, refetch } = useGetMyBookingsQuery(undefined);
  const bookingData = (data?.data || []) as TBooking[];

  // Filter for bookings with approved or completed status
  const filteredBookings = bookingData.filter(
    (booking: TBooking) => booking.status === "approved" || booking.status === "completed"
  );

  // Sorting State
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort bookings based on the selected column and order
  const sortedBookings = [...filteredBookings].sort((a: TBooking, b: TBooking) => {
    if (sortBy === "paymentStatus") {
      // Custom sorting for Payment Status
      const aStatus = a.completedPayment ? 1 : 0;
      const bStatus = b.completedPayment ? 1 : 0;
      return sortOrder === "asc" ? aStatus - bStatus : bStatus - aStatus;
    } else {
      // General sorting for other fields
      const sortField = sortBy as keyof TBooking;
      const compare =
        sortOrder === "asc"
          ? new Date(a[sortField] as string).getTime() - new Date(b[sortField] as string).getTime()
          : new Date(b[sortField] as string).getTime() - new Date(a[sortField] as string).getTime();
      return compare;
    }
  });

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">My Payments</h1>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="md:container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Payments</h1>

      {/* Sort by options using Chip */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Sort by:</p>
        {sortOptions.map((option) => (
          <Chip
            layoutId="sorting"
            key={option.value}
            text={option.label}
            selected={sortBy === option.value}
            setSelected={() => handleSortChange(option.value)}
          />
        ))}
      </div>

      {/* Payment Table */}
      <motion.div layout>
        <Table className="min-w-full text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Actions</TableHead> {/* New column for actions */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking: TBooking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>{new Date(booking.startDate).toLocaleString()}</TableCell>
                  <TableCell>{new Date(booking.endDate).toLocaleString()}</TableCell>
                  <TableCell>${booking.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    {booking.completedPayment ? "Paid" : "Awaiting Payment"}
                  </TableCell>
                  <TableCell>{booking.completedPayment ? booking.paymentType : "N/A"}</TableCell>
                  {/* Render BookingActions component */}
                  <TableCell >
                    <BookingActions
                      payment={true}
                     booking={booking}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default Payments;
