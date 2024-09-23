import { FaRegUser } from "react-icons/fa";
import Profile from "../pages/Profile/Profile";
import { FaListUl } from "react-icons/fa6";
import { PiStackPlus } from "react-icons/pi";
import Payments from "../pages/Payments/Payments";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MyBookings from "../pages/MyBookings/MyBookings";
import { MdOutlinePayments } from "react-icons/md";

export const userPaths = [
  {
    name: "Profile",
    route: "",
    element: (
      <ProtectedRoute isDashboard={true}>
        <Profile />
      </ProtectedRoute>
    ),
    icon: <FaRegUser className="h-5 w-5" />,
  },
  {
    name: "Manage Bookings",
    route: "my-bookings",
    element: (
      <ProtectedRoute role="user">
        <MyBookings />
      </ProtectedRoute>
    ),
    icon: <PiStackPlus className="h-5 w-5" />,
  },
  {
    name: "Payments",
    route: "payments",
    element: (
      <ProtectedRoute role="user">
        <Payments />
      </ProtectedRoute>
    ),
    icon: <MdOutlinePayments className="h-5 w-5" />,
  },
];

export const userDashboardRoutes = userPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
