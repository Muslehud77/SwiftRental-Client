import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import Profile from "../pages/Profile/Profile";


import ManageCars from "../pages/ManageCars/ManageCars";
import AddCar from "../pages/AddCar/AddCar";
import ManageUsers from "../pages/ManageUsers/ManageUsers";

import DeletedProducts from "../pages/DeletedCars/DeletedCars";
import EditCar from "../pages/EditCar/EditCar";
import Statistics from "../pages/Statistics/Statistics";
import ManageBookings from "../pages/ManageBookings/ManageBookings";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";



export const adminPaths = [
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
    name: "Statistics",
    route: "statistics",
    element: (
      <ProtectedRoute role="admin">
        <Statistics />
      </ProtectedRoute>
    ),
    icon: <ImStatsBars className="h-5 w-5" />,
  },
  {
    name: "Manage Cars",
    route: "manage-cars",
    element: (
      <ProtectedRoute role="admin">
        <ManageCars />
      </ProtectedRoute>
    ),
    icon: <TbTruckDelivery className="h-5 w-5" />,
  },
  {
    name: "Manage Bookings",
    route: "manage-bookings",
    element: (
      <ProtectedRoute role="admin">
        <ManageBookings />
      </ProtectedRoute>
    ),
    icon: <AiOutlineProduct className="h-5 w-5" />,
  },
  {
    name: "Deleted Cars",
    route: "deleted-cars",
    element: (
      <ProtectedRoute role="admin">
        <DeletedProducts />
      </ProtectedRoute>
    ),
    icon: <AiOutlineDelete className="h-5 w-5" />,
  },
  {
    name: "Add Car",
    route: "add-car",
    element: (
      <ProtectedRoute role="admin">
        <AddCar />
      </ProtectedRoute>
    ),
    icon: <MdFormatListBulletedAdd className="h-5 w-5" />,
  },
  {
    name: "Manage Users",
    route: "manage-users",
    element: (
      <ProtectedRoute role="admin">
        <ManageUsers />
      </ProtectedRoute>
    ),
    icon: <FaUsersCog className="h-5 w-5" />,
  },
  {
    name: "Edit Car",
    route: "edit-car/:id",
    element: (
      <ProtectedRoute role="admin">
        <EditCar />
      </ProtectedRoute>
    ),
    icon: null,
  },
];

export const adminDashboardRoutes = adminPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
