import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuthToken } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRouteForLoginRegister = ({ children }: ProtectedRouteProps) => {
  const { state, pathname } = useLocation();

  const token = useAppSelector(selectAuthToken);

  console.log(pathname)


  if (!token) {
    return children;
  }

  return <Navigate to={state ? state : "/"} state={state ? state : pathname} />;
};

export default ProtectedRouteForLoginRegister;
