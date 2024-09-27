import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { TBooking } from "../../types/global.type";
import BookingActions from "../MyBookings/BookingActions";
import { FiCheckCircle, FiStopCircle, FiXCircle } from "react-icons/fi";
import { useToastPromise } from "../../hooks/useToastPromise";
import { useUpdateStatusMutation } from "../../redux/features/Booking/bookingApi";

type BookingStatusProps = {
  booking: TBooking;
};

const BookingStatusHandler = ({ booking }: BookingStatusProps) => {
  const { toastPromise } = useToastPromise();
  const [updateStatus] = useUpdateStatusMutation();

  const handleEndTrip = (bookingId: string) => {
    // Logic to end the trip
  };

  const handleStatusChange = async (
    bookingId: string,
    status: "approved" | "rejected"
  ) => {
    await toastPromise(
      updateStatus,
      { data: { status,_id:bookingId }},
      "Changing the status",
      "Status updated.."
    );
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2 justify-end">
        {/* End Trip Button */}
        {booking.status === "approved" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-xl" variant="outline">
                    {new Date(booking.endDate) > new Date() ? (
                      <FiStopCircle />
                    ) : (
                      <FiStopCircle className="text-red-500 animate-pulse" />
                    )}
                    <span className="sr-only">End Trip</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>End Trip Confirmation</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to end the trip for this booking?</p>
                  <DialogFooter>
                    <Button
                      onClick={() => handleEndTrip(booking._id)}
                      variant="destructive"
                    >
                      Confirm
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>End Trip?</TooltipContent>
          </Tooltip>
        )}

        {/* Pending Approval Buttons */}
        {booking.status === "pending" && (
          <>
            {/* Approve Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FiCheckCircle className="text-xl" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="text-foreground">
                    <DialogHeader>
                      <DialogTitle>Approve Booking</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to approve this booking?</p>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() =>
                            handleStatusChange(booking._id, "approved")
                          }
                          variant="default"
                        >
                          Approve
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Approve?</TooltipContent>
            </Tooltip>

            {/* Reject Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <FiXCircle className="text-xl" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="text-foreground">
                    <DialogHeader>
                      <DialogTitle>Reject Booking</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to reject this booking?</p>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() =>
                            handleStatusChange(booking._id, "rejected")
                          }
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Reject?</TooltipContent>
            </Tooltip>
          </>
        )}

        <BookingActions manageBookings={true} booking={booking} />
      </div>
    </TooltipProvider>
  );
};

export default BookingStatusHandler;
