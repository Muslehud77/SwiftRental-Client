import { useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { Chip } from "../../components/ui/Chip"; // Importing Chip for sorting
import { Skeleton } from "../../components/ui/skeleton"; // Skeleton for loading state
import BookingActions from "../MyBookings/BookingActions";
import { useLocation } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

// Define sort options with corresponding labels
const sortOptions = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed Payment" },
  { value: "non-completed", label: "Non-Completed Payment" },
];

const paymentTypeOptions = [
  { value: "Aamar Pay", label: "Aamar Pay" },
  { value: "stripe", label: "Stripe" },
  { value: "cash", label: "Cash" },
];

const dateSortOptions = [
 
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

const Payments = () => {
  const {state} = useLocation()
  const { data, isLoading, isError, refetch } =
    useGetMyBookingsQuery(undefined);
  const bookings = (data?.data || []) as TBooking[];
  // State for filtering and sorting
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [paymentType, setPaymentType] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<string>("newest");

  const bookingData = bookings?.filter(booking=> booking.status !== "pending" && booking.status!== "rejected")


  useEffect(()=>{

    if(state==="recent"){
      setPaymentFilter("completed")
      setPaymentType("stripe")
    }

  },[])


  // Handle completed vs non-completed payment filter
  const filteredBookings =
    paymentFilter === "all"
      ? [...bookingData]
      : bookingData.filter((booking: TBooking) => {
          return paymentFilter === "completed"
            ? booking.completedPayment
            : !booking.completedPayment;
        });

  // Handle payment type filter (only applies to completed payments)
  const filteredByPaymentType = paymentType
    ? filteredBookings.filter(
        (booking: TBooking) =>
          booking.paymentType === paymentType && booking.completedPayment
      )
    : filteredBookings;

  // Handle date sorting (newest or oldest)
  const sortedBookings = [...filteredByPaymentType].sort(
    (a: TBooking, b: TBooking) => {
      const sortField = "createdAt";
      if (dateSort === "newest") {
        return (
          new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime()
        );
      } else {
        return (
          new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
        );
      }
    }
  );


  // Handle error state
  if (isError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Something went wrong!
        </h2>
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
    <div className=" px-6 md:px-6 py-8">
      <h1 className="text-foreground text-2xl font-bold mb-6">My Payments</h1>

      <motion.div
        layout
        className="flex flex-col md:flex-row justify-between items-start md:items-center w-full"
      >
        {/* Payment Status Filter */}
        <div className="mb-6 flex gap-4 justify-start md:justify-center items-center flex-wrap">
          {sortOptions.map((option) => (
            <Chip
              layoutId="paymentFilter"
              key={option.value}
              text={option.label}
              selected={paymentFilter === option.value}
              setSelected={() => {
                setPaymentFilter(option.value);
                setPaymentType(null); // Reset payment type when changing the payment status
              }}
            />
          ))}
        </div>

        {/* Payment Type Filter (only for completed payments) */}
        <AnimatePresence>
          {paymentFilter === "completed" && (
            <div className="mb-6 flex gap-4 justify-start md:justify-center items-center flex-wrap">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Payment Type:
              </p>
              {paymentTypeOptions.map((option) => (
                <Chip
                  layoutId="paymentType"
                  key={option.value}
                  text={option.label}
                  selected={paymentType === option.value}
                  setSelected={() => setPaymentType(option.value)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Date Sort Options */}
        <div className="mb-6 flex gap-4 justify-start md:justify-center items-center flex-wrap">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Sort by :
          </p>
          {dateSortOptions.map((option) => (
            <Chip
              layoutId="dateSort"
              key={option.value}
              text={option.label}
              selected={dateSort === option.value}
              setSelected={() => setDateSort(option.value)}
            />
          ))}
        </div>
      </motion.div>

      {/* Payment Table */}
      <motion.div layout>
        <hr />
        <Table className="text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Car Name</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center space-y-2">
                  {[1, 2, 3, 4, 5].map((a) => (
                    <Skeleton key={a} className="h-10 w-full"></Skeleton>
                  ))}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sortedBookings.length > 0 ? (
                  sortedBookings.map((booking: TBooking) => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking._id}</TableCell>
                      <TableCell>{booking.carId.name}</TableCell>
                      <TableCell>{booking.carId.model}</TableCell>
                      <TableCell>
                        {new Date(booking.startDate).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.endDate).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold">${booking.totalCost.toFixed(2)}</TableCell>
                      <TableCell>
                        {booking.completedPayment ? (
                          <Badge variant="secondary">Paid</Badge>
                        ) : (
                          <Badge variant="destructive">Awaiting Payment</Badge>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">
                        {booking.completedPayment ? (
                          <Badge variant="outline">{booking.paymentType}</Badge>
                        ) : (
                          <Badge variant="destructive">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <BookingActions payment={true} booking={booking} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default Payments;
