import { selectAuthToken, selectAuthUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

export const useUser = ()=>{
    
    const user = useAppSelector(selectAuthUser)
    const token = useAppSelector(selectAuthToken)
    
    return {user,token}
}