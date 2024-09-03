import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AllProducts from "../pages/BookCar/BookCar";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AddCar from "../pages/AddCar/AddCar";
import LoginPage from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";

import { userDashboardRoutes } from "./UserRoutes";
import ProtectedRouteForLoginRegister from "../ProtectedRoute/ProtectedRouteForLoginRegister";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { adminDashboardRoutes } from "./AdminRoutes";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/add-product",
        element: <AddCar />,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <ProtectedRouteForLoginRegister>
        <LoginPage />
      </ProtectedRouteForLoginRegister>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRouteForLoginRegister>
        <Register />
      </ProtectedRouteForLoginRegister>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [...userDashboardRoutes, ...adminDashboardRoutes],
  },
]);
