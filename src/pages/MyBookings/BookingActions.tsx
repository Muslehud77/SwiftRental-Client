import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../components/ui/dialog";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../../components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import axios from "axios";
import { TBooking } from "../../types/global.type";
import { useDeleteBookingMutation, useModifyBookingMutation } from "../../redux/features/Booking/bookingApi";
import { useToastPromise } from "../../hooks/useToastPromise";
import DateTimePicker from "../../components/Searchbar/DateTimePicker";
import { additionalFeatures } from "../CarDetails/CarDetails";
import {AnimatePresence, motion} from "framer-motion"
import { FaCheckCircle } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import dayjs from "dayjs";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PublishableKey);

type BookingActionsProps = {
  booking: TBooking;
};

const BookingActions = ({ booking }: BookingActionsProps) => {
    const { tripTime } = useAppSelector(selectLocation);
    const {toastPromise} = useToastPromise()
    const [cancelBooking] = useDeleteBookingMutation()
    const [modifyBooking] = useModifyBookingMutation()
  const [paymentSecret, setPaymentSecret] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [stripeDialogOpen, setStripeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
 const [selectedFeatures, setSelectedFeatures] = useState<
   { label: string; price: number }[]
 >([]);
 const [startDate, endDate] = tripTime;
const [totalPrice, setTotalPrice] = useState<number>(0);

  let tripDuration = dayjs(endDate).isAfter(dayjs(startDate))
    ? dayjs(endDate).diff(dayjs(startDate), "hour")
    : 0;

 useEffect(()=>{
    if(booking.additionalFeatures){
        setSelectedFeatures([...booking.additionalFeatures.map(f=> ({label:f.name,price:f.price}))])
    }
 },[])

useEffect(() => {
  if (tripDuration >= 0) {
    const pricePerDay = booking?.carId?.pricePerDay || 0;
    const pricePerHour = booking?.carId?.pricePerHour || 0;

    const basePrice =
      tripDuration >= 24
        ? Math.ceil(tripDuration / 24) * Number(pricePerDay)
        : tripDuration * Number(pricePerHour);

    const featuresPrice = selectedFeatures.reduce((total, feature) => {
      const featureItem = additionalFeatures.find(
        (item) => item.label === feature.label
      );
      return (
        total +
        (featureItem
          ? featureItem.price *
            (tripDuration >= 24 ? Math.ceil(tripDuration / 24) : tripDuration)
          : 0)
      );
    }, 0);

    setTotalPrice(basePrice + featuresPrice);
  }
}, [tripDuration, selectedFeatures]);


  const paymentOptions = [
    {
      name: "Cash",
      description:
        "Pay in cash at the time of car pickup, It needs to be confirmed from the admin panel.",
    },
    {
      name: "Stripe",
      description: "Pay using credit/debit card via Stripe",
    },
  ];

  const handlePaymentSelection = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const handleConfirmPayment = async (cost: number) => {
    setPaymentSecret("");
    if (selectedPaymentMethod === "Cash") {
      console.log("Processing cash payment...");
    } else if (selectedPaymentMethod === "Stripe") {
      const data = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-payment-intent`,
        { price: cost },
        { withCredentials: true }
      );
      setStripeDialogOpen(true);
      setPaymentSecret(data.data.clientSecret);
    }
  };

  const handleModifyBooking = () => {
    const data = {
      additionalFeatures: selectedFeatures.map((f) => ({
        name: f.label,
        price: f.price,
      })),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalCost:totalPrice
    };
    const res = toastPromise(modifyBooking,{data,id:booking._id}, "Saving changes...");
    console.log(res);
    setModifyDialogOpen(false);
  };

  const handleCancelBooking = async (bookingId: string) => {
    
    await toastPromise(cancelBooking,bookingId,"Cancelling the booking for you...")

   

  };


    const toggleFeature = (feature: { label: string; price: number }) => {
      if (selectedFeatures.find((f) => f.label === feature.label)) {
        setSelectedFeatures(
          selectedFeatures.filter((item) => item.label !== feature.label)
        );
      } else {
        setSelectedFeatures([...selectedFeatures, feature]);
      }
    };



  return (
    <>
      <div
        onClick={() => setShowDatePicker(false)}
        className="mt-4 space-x-4 self-end"
      >
        {booking.status === "rejected" ? (
          <h1 className="text-white bg-primary !text-white p-2 rounded-xl uppercase">
            Booking has been rejected
          </h1>
        ) : (
          <>
            {/* Modify Button */}
            <Button
              disabled={booking.status !== "pending"}
              className=""
              onClick={() => setModifyDialogOpen(true)}
            >
              Modify
            </Button>

            {/* Cancel Button */}
            <Button
              disabled={booking.status !== "pending"}
              className="px-4 py-2 rounded-lg font-semibold shadow-lg !bg-primary !text-white"
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancel
            </Button>

            {/* Payment Button (only if approved) */}
            {booking.status === "approved" && !booking.completedPayment && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:bg-indigo-600 transition-all duration-300 ease-in-out">
                    Make Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 text-black dark:text-white rounded-xl shadow-lg p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-gray-900 dark:text-white font-bold">
                      Payment for {booking.carId.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      <strong>Total Amount:</strong> ${booking.totalCost}
                    </p>

                    {/* Payment Method Selection */}
                    <div className="mt-6">
                      <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Select Payment Method:
                      </p>
                      <RadioGroup
                        value={selectedPaymentMethod}
                        onChange={handlePaymentSelection}
                        className="space-y-2"
                      >
                        {paymentOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.name}
                            value={option.name}
                            className={({ checked }) =>
                              `group relative flex cursor-pointer rounded-lg bg-white dark:bg-gray-700 py-4 px-5 text-gray-700 dark:text-gray-200 shadow-md transition-all focus:outline-none ${
                                checked
                                  ? "border-2 border-primary/50"
                                  : "bg-gray-100 dark:bg-gray-600"
                              }`
                            }
                          >
                            {({ checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="text-sm w-11/12">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                      {option.name}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      {option.description}
                                    </p>
                                  </div>
                                  <CheckCircleIcon
                                    className={`size-5 ${
                                      checked
                                        ? "opacity-100 text-primary"
                                        : "opacity-0"
                                    } transition-opacity`}
                                  />
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Confirm Payment Button */}
                    <div className="mt-6">
                      <Button
                        disabled={selectedPaymentMethod === "Cash"}
                        className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
                          selectedPaymentMethod === "Cash"
                            ? "bg-gray-500 dark:bg-gray-600 cursor-not-allowed"
                            : "transition-all"
                        }`}
                        onClick={() => handleConfirmPayment(booking.totalCost)}
                      >
                        Confirm Payment
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>

      {/* Stripe Payment Dialog */}
      <Dialog open={stripeDialogOpen} onOpenChange={setStripeDialogOpen}>
        <DialogContent className="!bg-white p-8 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Stripe Payment</DialogTitle>
          </DialogHeader>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentSecret }}
          >
            <StripePaymentForm booking={booking} />
          </Elements>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 text-black dark:text-white rounded-xl shadow-lg p-8">
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              onClick={() => setCancelDialogOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black"
            >
              No, Keep Booking
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                handleCancelBooking(booking._id);
                setCancelDialogOpen(false);
              }}
            >
              Yes, Cancel Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modify Booking Dialog */}
      <Dialog open={modifyDialogOpen} onOpenChange={setModifyDialogOpen}>
        <DialogContent
          onClick={() => setShowDatePicker(false)}
          className="backdrop-blur-lg bg-gray-900/90  text-white rounded-xl shadow-lg p-8"
        >
          <DialogHeader>
            <DialogTitle>Modify Booking</DialogTitle>
          </DialogHeader>

          <DateTimePicker
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            dates={[new Date(booking.startDate), new Date(booking.endDate)]}
          />
          <div>
            <p className="text-lg font-semibold mb-1">Additional Features</p>
            <div className="flex flex-wrap gap-4">
              {additionalFeatures.map((feature) => (
                <motion.div
                  layout
                  key={feature.label}
                  onClick={() => toggleFeature(feature)}
                  className={`${
                    selectedFeatures.find((f) => f.label === feature.label)
                      ? "bg-primary text-white"
                      : "bg-background text-foreground/80"
                  } font-thin uppercase relative cursor-pointer flex items-center justify-between px-4 py-2 rounded-md shadow transition-colors duration-200`}
                >
                  <span>
                    {feature.label} ${feature.price}
                  </span>

                  <AnimatePresence>
                    {selectedFeatures.find(
                      (f) => f.label === feature.label
                    ) && (
                      <motion.span>
                        <FaCheckCircle className="text-foreground ml-2" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Pricing</p>
            <span className="text-2xl font-bold text-white">${totalPrice}</span>
            <p className="text-sm text-white/80">
              Based on {Math.floor(tripDuration / 24)} day(s) and{" "}
              {tripDuration % 24} hour(s) of trip duration and selected
              features.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleModifyBooking}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingActions;
