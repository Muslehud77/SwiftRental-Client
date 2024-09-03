import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuthUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedForUser = ({ children }: ProtectedRouteProps) => {
  const { pathname } = useLocation();

  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return <Navigate to={"/login"} state={pathname} />;
  }

  if (user?.role === "user") {
    return children;
  }

  return <Navigate to={"/"} />;
};

export default ProtectedForUser;
