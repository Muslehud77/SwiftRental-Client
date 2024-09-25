


import { Helmet } from "react-helmet-async";
import { useGetAllBookingsQuery } from "../../redux/features/Booking/bookingApi";

export default function ManageBookings() {
 
const {data} = useGetAllBookingsQuery(undefined)

console.log(data);


  return (
    <div className="p-6">
      <Helmet>
        <title>Dashboard | Manage Bookings</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-foreground mb-4">My Bookings</h1>
    </div>
  );
}



