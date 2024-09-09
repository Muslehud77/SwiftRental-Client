import { selectAuthToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";

const useDecodedToken = () => {

  const token = useAppSelector(selectAuthToken) as string;
  
  if(token){
    const decoded = jwtDecode(token) as {
      id: string;
      role: "admin" | "user";
      exp: number;
      iat: number;
    };

    return decoded;
  }else{
    return {}
  }

  
};

export default useDecodedToken;
