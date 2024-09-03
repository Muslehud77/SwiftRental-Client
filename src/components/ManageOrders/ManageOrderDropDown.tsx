import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";

import toast from "react-hot-toast";

type ManageOrderDropDownProps = {
  _id: string;
  status: string;
};

const ManageOrderDropDown = ({ _id, status }: ManageOrderDropDownProps) => {


  const handleStatusChange = async (_id: string, status: string) => {
    
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
                  Are you sure you want to change the status to {status}?
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
           
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Dismiss
            </button>
          </div>
        </div>
      ));
  };

  return (
    <DropdownMenu>
      {status === "delivered" ? (
        <IoCheckmarkDoneCircleOutline className="size-8 text-green-500" />
      ) : (
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="outline">
            <IoIosArrowDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align="end">
        {status === "pending" ? (
          <>
            {" "}
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivering")}
            >
              Mark as Delivering
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivered")}
            >
              Mark as Delivered
            </DropdownMenuItem>
          </>
        ) : status === "delivering" ? (
          <>
            {" "}
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivered")}
            >
              Mark as Delivered
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManageOrderDropDown;
