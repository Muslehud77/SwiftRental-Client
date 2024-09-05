import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Button } from "../ui/button";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TUser } from "../../redux/features/auth/authSlice";
import { useChangeRoleMutation } from "../../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import  { useState } from "react";
import { Input } from "../ui/input";
import { LiaUserShieldSolid, LiaUserSolid } from "react-icons/lia";
import useDecodedToken from "../../hooks/useDecodedToken";
type MakeAdminProps = {
  user: TUser;
};

const MakeAdmin = ({ user }: MakeAdminProps) => {
  const [changeRole] = useChangeRoleMutation();
  const {id} = useDecodedToken()
  
  const role = user.role === "admin" ? "user" : "admin"

  const changeRoleOfUser = async (_id: string) => {
    const CustomToast = ({
      t,
      onConfirm,
    }: {
      t: any;
      onConfirm: (password: string, toastId: string) => void;
    }) => {
      const [password, setPassword] = useState("");

      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {`  Are you sure you want to make this user ${role==="admin" ? "an" : "a"} ${role}?`}
                </p>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-2 border rounded text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex border-l border-gray-200">
            <button

              disabled={password.length <= 5 ? true : false}
              onClick={async () => {
                onConfirm(password, t.id);
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    };

    toast.custom(
      (t) => (
        <CustomToast
          t={t}
          onConfirm={(password, toastId) => {
            toast.promise(changeRole({ _id, password, role }), {
              loading: "Saving...",
              success: (res: any) => {
                if (res?.error) {
                  toast.dismiss(toastId);
                
                  throw new Error(res.error.data.message);
                }
               
                toast.dismiss(toastId);
                return <p>User promoted to admin successfully!</p>;
              },
              error: (err) => (
                <p>{err?.message || "Could not promote the user to admin!"}</p>
              ),
            });
          }}
        />
      ),
      { duration: 8000 }
    );
  };

  return (
    <>
      <TooltipTrigger asChild>
        <Button
          disabled={user._id === id}
          onClick={() => changeRoleOfUser(user._id)}
          variant="outline"
          size="icon"
        >
          {role === "user" ? (
            <>
              {" "}
              <LiaUserSolid className="size-5" />
              <span className="sr-only">Make User</span>
            </>
          ) : (
            <>
              <LiaUserShieldSolid className="size-5" />
              <span className="sr-only">Make Admin</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="capitalize">Make {role}</TooltipContent>
    </>
  );
};

export default MakeAdmin;
