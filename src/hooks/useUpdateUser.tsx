import toast from "react-hot-toast";
import { signIn } from "../redux/features/auth/authSlice";
import { useUpdateUserMutation } from "../redux/features/user/userApi";
import { useAppDispatch } from "../redux/hooks";
import { useUser } from "./useUser";
import { useState } from "react";


export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [updateUserMutation] = useUpdateUserMutation();

  const { token } = useUser();

  const updateUser = async (
    userDataForUpdatingTheUser : {
      address?: string;
      phone?: string;
    },
    cart: boolean
  ) => {
    setLoading(true);
    try {
      const res = (await updateUserMutation(userDataForUpdatingTheUser)) as any;
        
      if (res?.error) {
        throw new Error(res?.error?.message);
      } else {
      
        dispatch(signIn({ user: res?.data?.data, token }));
        toast(
          cart
            ? "Updated the user address and phone for upcoming orders!"
            : "You are updated!",
          {
            icon: "👍",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }
      return res;
    } catch (error:any) {
      toast.error(error.message || "Could not update user.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, updatingUser: loading };
};
