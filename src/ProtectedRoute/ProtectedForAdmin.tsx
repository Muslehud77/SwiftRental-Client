import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuthUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedForAdmin = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector(selectAuthUser);

   const { pathname } = useLocation();

   

   if (!user) {
     return <Navigate to={"/login"} state={pathname} />;
   }

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to={"/"} />;
};

export default ProtectedForAdmin;
