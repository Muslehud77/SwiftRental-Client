import { FaRegUser } from "react-icons/fa";
import Profile from "../pages/Profile/Profile";

import { LuShoppingCart } from "react-icons/lu";


import { FaListUl } from "react-icons/fa6";


import Payments from "../pages/Payments/Payments";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MyBookings from "../pages/MyBookings/MyBookings";

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
        <MyBookings/>
      </ProtectedRoute >
    ),
    icon: <LuShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Payments",
    route: "payments",
    element: (
      <ProtectedRoute role="user">
        <Payments />
      </ProtectedRoute >
    ),
    icon: <FaListUl className="h-5 w-5" />,
  },
];

export const userDashboardRoutes = userPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
