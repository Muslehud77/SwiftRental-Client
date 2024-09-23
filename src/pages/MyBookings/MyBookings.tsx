import { useState } from "react";
import { useGetMyBookingsQuery } from "../../redux/features/Booking/bookingApi";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"; // shadcn's dialog component
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, CurrencyDollarIcon, IdentificationIcon } from "@heroicons/react/24/solid";
import { Button } from "../../components/ui/button";

// Import Stripe dependencies
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm"; // Separate Stripe form component
import axios from "axios";
import { TBooking } from "../../types/global.type";
import { CalendarIcon, ClockIcon } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PublishableKey);

const MyBookings = () => {
  const { data } = useGetMyBookingsQuery(undefined);
  const bookingData = data?.data;



  // State to control the selected payment method and current booking
  const [paymentSecret, setPaymentSecret] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [stripeDialogOpen, setStripeDialogOpen] = useState(false); // To control Stripe Dialog visibility

  const paymentOptions = [
    { name: "Cash", description: "Pay in cash at the time of car pickup, It needs to be confirmed from the admin panel." },
    { name: "Stripe", description: "Pay using credit/debit card via Stripe" },
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
        {
          price: cost,
        },
        {
          withCredentials: true,
        }
      );

      setStripeDialogOpen(true);

      setPaymentSecret(data.data.clientSecret);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">My Bookings</h1>

      <div className="grid gap-6">
        {bookingData?.map(
          (booking: TBooking) =>
            !booking.completedPayment && (
              <motion.div
                key={booking._id}
                transition={{ duration: 0.2 }}
                layoutId={booking._id}
                className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800/50 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Car Image */}
                  <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-md">
                    <ImageWithBlurHash
                      object="cover"
                      className="rounded-xl overflow-hidden"
                      src={booking.carId.images[0].url}
                      blurHash={booking.carId.images[0].blurHash as string}
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex flex-col justify-between w-full">
                    {/* Car Information */}
                    <div>
                      <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                        {booking.carId.name} - {booking.carId.model} (
                        {booking.carId.year})
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                        {booking.carId.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 my-4 b">
                      {booking.additionalFeatures.map(
                        (feature, index: number) => (
                          <span
                            key={index}
                            className="bg-primary/40 text-white/80 backdrop-blur-lg border border-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {feature.name} ${feature.price}
                          </span>
                        )
                      )}
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3">
                      {/* Trip Ongoing Notification */}
                      {new Date() >= new Date(booking.startDate) &&
                        new Date() <= new Date(booking.endDate) && (
                          <div className="bg-green-500/10 text-white p-2 rounded-lg text-center uppercase">
                            Trip is currently ongoing!
                          </div>
                        )}

                      {/* Booking ID */}
                      <p className="text-lg font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                        <span className="text-primary dark:text-indigo-400">
                          <IdentificationIcon className="h-5 w-5" />
                        </span>
                        <span>Booking ID:</span>
                        <span className="text-gray-600 dark:text-gray-300 font-mono truncate">
                          {booking._id}
                        </span>
                      </p>

                      {/* Start and End Dates */}
                      <div className="flex flex-col md:flex-row justify-between items-start space-y-2 md:space-y-0">
                        <p className="text-base text-gray-800 dark:text-gray-300 flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                          <span>Start Date:</span>
                          <span className="font-medium">
                            {new Date(booking.startDate).toLocaleString()}
                          </span>
                        </p>

                        <p className="text-base text-gray-800 dark:text-gray-300 flex items-center space-x-2">
                          <ClockIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                          <span>End Date:</span>
                          <span className="font-medium">
                            {new Date(booking.endDate).toLocaleString()}
                          </span>
                        </p>
                      </div>

                      {/* Total Cost */}
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <span>Total Cost:</span>
                        <span>${booking.totalCost}</span>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <div className="mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:bg-indigo-600 transition-all duration-300 ease-in-out"
                            onClick={() => setSelectedBooking(booking)}
                          >
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
                              <strong>Total Amount:</strong> $
                              {booking.totalCost}
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
                                onClick={() =>
                                  handleConfirmPayment(booking.totalCost)
                                }
                              >
                                Confirm Payment
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
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
            <StripePaymentForm booking={selectedBooking} />
          </Elements>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings;
