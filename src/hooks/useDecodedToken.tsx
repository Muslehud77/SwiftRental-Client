import { selectAuthToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";


type TDecoded = {
  id?: string;
  role?: "admin" | "user";
  exp?: number;
  iat?: number;
};

const useDecodedToken = () => {
  
  const token = useAppSelector(selectAuthToken) as string;
  
  if(token){
    const decoded = jwtDecode(token) as TDecoded

    return decoded;
  }else{
    return {} as TDecoded
  }

  
};

export default useDecodedToken;
