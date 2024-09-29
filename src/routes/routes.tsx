import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Inventory from "../pages/Inventory/Inventory";
import CarDetails from "../pages/CarDetails/CarDetails";

import LoginPage from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";

import { userDashboardRoutes } from "./UserRoutes";
import ProtectedRouteForLoginRegister from "../ProtectedRoute/ProtectedRouteForLoginRegister";

import { adminDashboardRoutes } from "./AdminRoutes";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Contact from "../pages/Contact/Contact";

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/car-details/:id",
        element: <CarDetails />,
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
      <ProtectedRoute isDashboard={true}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [...userDashboardRoutes, ...adminDashboardRoutes],
  },
]);
