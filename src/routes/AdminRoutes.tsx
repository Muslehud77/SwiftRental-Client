import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedForAdmin from "../ProtectedRoute/ProtectedForAdmin";
import ManageCars from "../pages/ManageCars/ManageCars";
import AddCar from "../pages/AddCar/AddCar";
import ManageUsers from "../pages/ManageUsers/ManageUsers";

import DeletedProducts from "../pages/DeletedCars/DeletedCars";
import EditCar from "../pages/EditCar/EditCar";
import Statistics from "../pages/Statistics/Statistics";
import ManageBookings from "../pages/ManageBookings/ManageBookings";



export const adminPaths = [
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
    name: "Statistics",
    route: "statistics",
    element: (
      <ProtectedRoute>
        <Statistics />
      </ProtectedRoute>
    ),
    icon: <ImStatsBars className="h-5 w-5" />,
  },
  {
    name: "Manage Cars",
    route: "manage-cars",
    element: (
      <ProtectedForAdmin>
        <ManageCars />
      </ProtectedForAdmin>
    ),
    icon: <TbTruckDelivery className="h-5 w-5" />,
  },
  {
    name: "Manage Bookings",
    route: "manage-bookings",
    element: (
      <ProtectedForAdmin>
        <ManageBookings />
      </ProtectedForAdmin>
    ),
    icon: <AiOutlineProduct className="h-5 w-5" />,
  },
  {
    name: "Deleted Cars",
    route: "deleted-cars",
    element: (
      <ProtectedForAdmin>
        <DeletedProducts />
      </ProtectedForAdmin>
    ),
    icon: <AiOutlineDelete className="h-5 w-5" />,
  },
  {
    name: "Add Car",
    route: "add-car",
    element: (
      <ProtectedForAdmin>
        <AddCar />
      </ProtectedForAdmin>
    ),
    icon: <MdFormatListBulletedAdd className="h-5 w-5" />,
  },
  {
    name: "Manage Users",
    route: "manage-users",
    element: (
      <ProtectedForAdmin>
        <ManageUsers />
      </ProtectedForAdmin>
    ),
    icon: <FaUsersCog className="h-5 w-5" />,
  },
  {
    name: "Edit Car",
    route: "edit-car/:id",
    element: (
      <ProtectedForAdmin>
        <EditCar />
      </ProtectedForAdmin>
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
