import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuthUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import useDecodedToken from "../hooks/useDecodedToken";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: "admin" | "user";
  isDashboard?: boolean;
};

const ProtectedRoute = ({
  children,
  role,
  isDashboard,
}: ProtectedRouteProps) => {
  const user = useAppSelector(selectAuthUser);

  const decoded = useDecodedToken();

  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to={"/login"} state={pathname} />;
  }

console.log(role,decoded)

  if (decoded?.role === role || isDashboard) {
    
    return children;
  }

  return <Navigate to={"/"} />;
};

export default ProtectedRoute;
