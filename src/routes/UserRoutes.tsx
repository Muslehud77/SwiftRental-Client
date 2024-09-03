import { FaRegUser } from "react-icons/fa";
import Profile from "../pages/Profile/Profile";

import { LuShoppingCart } from "react-icons/lu";


import { FaListUl } from "react-icons/fa6";
import ProtectedForUser from "../ProtectedRoute/ProtectedForUser";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ManageBookings from "../pages/ManageBookings/ManageBookings";
import Payments from "../pages/Payments/Payments";

export const userPaths = [
  {
    name: "Profile",
    route: "",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    icon: <FaRegUser className="h-5 w-5" />,
  },
  {
    name: "Manage Bookings",
    route: "manage-bookings",
    element: (
      <ProtectedForUser>
        <ManageBookings />
      </ProtectedForUser>
    ),
    icon: <LuShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Payments",
    route: "payments",
    element: (
      <ProtectedForUser>
        <Payments />
      </ProtectedForUser>
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
