import { ReactNode } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { pathname } = useLocation();

  const { user, token } = useUser();

  if (!user || !token) {
    return <Navigate to={"/login"} state={pathname} />;
  }

  return children;
};

export default ProtectedRoute;
