import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useGetAllBookingsQuery } from "../../redux/features/Booking/bookingApi";

import { Badge } from "../../components/ui/badge";

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "../../components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { TMeta, TQueryParams } from "../../types/global.type";
import { TUser } from "../../redux/features/auth/authSlice";
import { Paginate } from "../../components/Pagination/Pagination";
import { Skeleton } from "../../components/ui/skeleton";
import BookingStatusHandler from "./BookingStatus";

export default function ManageBookings() {
  const [page, setPage] = useState(1);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [filterPaymentType, setFilterPaymentType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("-createdAt");

  const queryParams = [
    { name: "sort", value: `${sortOrder}` },

    { name: "page", value: page },
    { name: "limit", value: 10 },
    filterStatus !== "all" ? { name: "status", value: filterStatus } : null,
    filterPayment !== "all"
      ? { name: "completedPayment", value: filterPayment === "completed" }
      : null,
    filterPaymentType !== "all"
      ? { name: "paymentType", value: filterPaymentType }
      : null,
  ].filter(Boolean) as TQueryParams;

  const { data, isLoading, isError, refetch } =
    useGetAllBookingsQuery(queryParams);
  const bookings = data?.data || [];
  const meta = data?.meta || ({} as TMeta);

  // Badge variant logic
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "completed":
        return "success";
      default:
        return "outline";
    }
  };

  const getPaymentBadgeVariant = (isPaid: boolean) => {
    return isPaid ? "default" : "secondary";
  };

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
    <div className="p-6 text-foreground">
      <Helmet>
        <title>Dashboard | Manage Bookings</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Manage Bookings
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/4">
          <label htmlFor="statusFilter" className="block mb-1 text-sm">
            Filter by Status
          </label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger id="statusFilter">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/4">
          <label htmlFor="paymentFilter" className="block mb-1 text-sm">
            Filter by Payment
          </label>
          <Select value={filterPayment} onValueChange={setFilterPayment}>
            <SelectTrigger id="paymentFilter">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/4">
          <label htmlFor="paymentTypeFilter" className="block mb-1 text-sm">
            Payment Type
          </label>
          <Select
            disabled={filterPayment === "incomplete" || filterPayment === "all"}
            value={filterPaymentType}
            onValueChange={setFilterPaymentType}
          >
            <SelectTrigger id="paymentTypeFilter">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="Aamar Pay">Aamar Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/4">
          <label htmlFor="sortOrder" className="block mb-1 text-sm">
            Sort by Date
          </label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sortOrder">
              <SelectValue placeholder="Newest to Oldest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Newest to Oldest</SelectItem>
              <SelectItem value="createdAt">Oldest to Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
            bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div className="flex items-center">
                    <img
                      src={(booking.user as TUser)?.image?.url}
                      alt={(booking.user as TUser).name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span>{(booking.user as TUser).name}</span>
                  </div>
                </TableCell>
                <TableCell>{`${booking.carId.name} ${booking.carId.model}`}</TableCell>
                <TableCell>
                  {new Date(booking.startDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.endDate).toLocaleString()}
                </TableCell>
                <TableCell className="font-bold">
                  ${booking.totalCost.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge className="capitalize" variant={getStatusBadgeVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getPaymentBadgeVariant(booking.completedPayment)}
                  >
                    {booking.completedPayment ? "Paid" : booking.status ==="rejected" ? "N/A" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">
                  {booking.completedPayment ? (
                    <Badge variant="outline">{booking.paymentType}</Badge>
                  ) : (
                    <Badge variant="destructive">N/A</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <BookingStatusHandler booking={booking} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {meta?.total >= 10 && (
        <div className="flex justify-end mt-2">
          <Paginate meta={meta} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
