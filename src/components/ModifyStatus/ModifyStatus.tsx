import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { VscDebugRestart } from "react-icons/vsc";
import { useDeleteCarMutation, useUpdateCarMutation } from "../../redux/features/Car/carApi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type DeleteCarProps = {
  id: string;
  isIcon?: boolean;
  className?: string;
  isManual?: boolean;
  action: "delete" | "recover";
};

const ModifyStatus = ({
  id,
  isIcon,
  className,
  isManual,
  action,
}: DeleteCarProps) => {
  const [deleteCar] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation()


  const navigate = useNavigate();

  const deleteCarHandler = async () => {
    const handleDelete = async () => {
      toast.promise(
        action === "delete" ? deleteCar(id) : updateCar({data:{isDeleted:false},id}),
        {
          loading: <p className="capitalize">{action}ing the product...</p>,
          success: (res: any) => {
            if (res?.error) {
              throw new Error(res.error.message);
            }
            navigate(
              action === "delete"
                ? "/dashboard/deleted-cars"
                : "/dashboard/manage-cars"
            );
            return (
              <p>
                Successfully {action === "delete" ? "deleted ⚠️" : "recovered 👍"}
              </p>
            );
          },
          error: (err) => <b>{err.message || "Could not delete!"}</b>,
        },
        { duration: 2000 }
      );
    };

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Are you sure?</p>
              <p className="mt-1 text-sm text-gray-500">
                Do you really want to {action} this car?
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-l border-gray-200">
          <Button
            onClick={() => {
              handleDelete();
              toast.dismiss(t.id);
            }}
            variant={action === "delete" ? "destructive" : "secondary"}
            className="w-full rounded-none capitalize"
          >
            {action}
          </Button>
          <Button
            onClick={() => toast.dismiss(t.id)}
            variant="ghost"
            className="w-full rounded-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isManual ? (
            <button
              type="button"
              onClick={() => deleteCarHandler()}
              className={`${className} capitalize`}
            >
              {isIcon ? (
                <>
                  {action === "delete" ? (
                    <MdOutlineDeleteSweep size={18} />
                  ) : (
                    <VscDebugRestart size={18} />
                  )}
                </>
              ) : (
                ` ${action} Car`
              )}
            </button>
          ) : (
            <Button
              type="button"
              variant={action === "delete" ? "destructive" : "secondary"}
              size={isIcon && !className ? "sm" : "default"}
              className={`${className} capitalize`}
              onClick={() => deleteCarHandler()}
            >
              {isIcon ? (
                <>
                  {action === "delete" ? (
                    <MdOutlineDeleteSweep size={18} />
                  ) : (
                    <VscDebugRestart size={18} />
                  )}
                </>
              ) : (
                ` ${action} Car`
              )}
            </Button>
          )}
        </TooltipTrigger>
        {isIcon && (
          <TooltipContent>
            <p className="capitalize">{action}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ModifyStatus;
