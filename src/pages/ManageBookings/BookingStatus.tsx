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
import { useReturnCarMutation } from "../../redux/features/Car/carApi";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { useTheme } from "../../components/ThemeProvider";
import dayjs  from 'dayjs';

type BookingStatusProps = {
  booking: TBooking;
};

const BookingStatusHandler = ({ booking }: BookingStatusProps) => {

    const { actualTheme } = useTheme();

    const [date,setDate] = useState<string|Date|DateObject>(new Date)

  const { toastPromise } = useToastPromise();
  const [updateStatus] = useUpdateStatusMutation();
  const [endTrip] = useReturnCarMutation();
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [error, setError] = useState<string | null>(null); // State to handle error

  useEffect(()=>{
    setDate(booking.endDate)
  },[])

  const handleEndTrip = async (bookingId: string, paid: boolean) => {
    const data = {
      _id: bookingId,
      endDate: new Date(date as Date),
    } as Partial<TBooking>;

    if (paid) {
      if (invoiceNumber === "") {
        setError("Invoice number is required if the user has paid."); // Set error message if input is empty
        return;
      } else {
        data["paymentType"] = "cash";
        data["paymentId"] = invoiceNumber;
      }
    }

    setError(null); // Clear any previous errors

    await toastPromise(
      endTrip,
      data,
      "Ending the trip..."
    );

    setPaymentConfirmation(false)

   
  };

  const handleStatusChange = async (
    bookingId: string,
    status: "approved" | "rejected"
  ) => {
    await toastPromise(
      updateStatus,
      { status, _id: bookingId },
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
                <DialogContent className="text-foreground">
                  <DialogHeader>
                    <DialogTitle>End Trip Confirmation</DialogTitle>
                  </DialogHeader>
                  <p>When did the user returned the car?</p>
                  <p>
                    End Time: {dayjs(new Date(date as Date)).format("MMM D, h:mm A")}
                  </p>

                  <Calendar
                    value={date}
                    onChange={setDate as (arg: DateObject) => void}
                    className={`!bg-card ${
                      actualTheme === "dark" ? "bg-dark" : ""
                    } red `}
                    shadow={false}
                    minDate={booking.startDate}
                    maxDate={new Date()}
                    format="DD/MM/YYYY HH:mm"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                            if(booking.completedPayment){
                                handleEndTrip(booking._id,false)
                            }else{

                                setPaymentConfirmation(true);
                            }
                        }}
                        variant="destructive"
                      >
                        Confirm
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
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

        <Dialog
          open={paymentConfirmation}
          onOpenChange={setPaymentConfirmation}
        >
          <DialogContent className="text-foreground">
            <DialogHeader>
              <DialogTitle>Did the user pay cash?</DialogTitle>
            </DialogHeader>

            <Label>Enter the invoice number if the user has paid in cash</Label>
            <Input
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <DialogFooter>
              <Button
                onClick={() => handleEndTrip(booking._id, true)}
                variant="secondary"
              >
                Paid
              </Button>
              <Button
                onClick={() => handleEndTrip(booking._id, false)}
                variant="destructive"
              >
                Hasn't paid
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <BookingActions manageBookings={true} booking={booking} />
      </div>
    </TooltipProvider>
  );
};

export default BookingStatusHandler;
