import { TUser } from "../../redux/features/auth/authSlice";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { CiLock, CiUnlock } from "react-icons/ci";

import { useChangeStatusOfUserMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";

import MakeAdmin from "./MakeAdmin";

type ManageUserActionsProps = {
  user: TUser;
};

const ManageUserActions = ({ user }: ManageUserActionsProps) => {
  const [updateStatus, {}] = useChangeStatusOfUserMutation();
 

  const changeStatus = async (_id: string) => {
    const status = user.status === "blocked" ? "in-progress" : "blocked";

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {`Are you sure you want to ${
                  status === "in-progress" ? "Unblock" : "Block"
                } the user?`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.promise(updateStatus({ _id, status }), {
                loading: "Saving...",
                success: <p>Status updated!</p>,
                error: <p>Could not update the status!</p>,
              });
              toast.dismiss(t.id);
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
    ));
  };



  return (
    <TooltipProvider>
      <Tooltip>
       <MakeAdmin user={user}/>
       
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => changeStatus(user._id)}
            variant="outline"
            size="icon"
            className={`${
              user.status !== "blocked" && user.role !== "admin"
                ? "border-red-700"
                : ""
            }`}
            disabled={user.status !== "in-progress" || user.role === "admin"}
          >
            <CiLock className="size-5" />
            <span className="sr-only">Block User</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Block User</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => changeStatus(user._id)}
            variant="outline"
            size="icon"
            className={`${user.status === "blocked" ? "border-green-700" : ""}`}
            disabled={user.status === "in-progress" || user.role === "admin"}
          >
            <CiUnlock className="size-5" />
            <span className="sr-only">Unblock User</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Unblock User</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ManageUserActions;
