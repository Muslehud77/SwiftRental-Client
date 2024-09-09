import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuthToken, selectAuthUser } from "../redux/features/auth/authSlice";
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
  const token = useAppSelector(selectAuthToken)
  const user = useAppSelector(selectAuthUser);

  const decoded = useDecodedToken() as {
    id: string;
    role: "admin" | "user";
    exp: number;
    iat: number;
  };

  const { pathname } = useLocation();

  if (!user || !token) {
    return <Navigate to={"/login"} state={pathname} />;
  }

  const hasAccess =  decoded?.role === role;

  if(decoded){
    if (hasAccess || isDashboard) {
      return children;
    }
  }

  return <Navigate to={"/"} />;
};

export default ProtectedRoute;
