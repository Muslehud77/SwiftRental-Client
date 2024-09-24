import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthUser } from "../../redux/features/auth/authSlice";
import { TBooking } from "../../types/global.type";
import { useToastPromise } from "../../hooks/useToastPromise";
import { useModifyBookingMutation } from "../../redux/features/Booking/bookingApi";
import { useNavigate } from "react-router-dom";

type TStripePaymentFormProps = {
  booking: TBooking;
  setPaymentOpen: (arg: boolean) => void;
  setStripeDialogOpen: (arg: boolean) => void;
};

const today = new Date();

const StripePaymentForm = ({
  booking,
  setStripeDialogOpen,
  setPaymentOpen,
}: TStripePaymentFormProps) => {
  const navigate = useNavigate();
  const { toastPromise } = useToastPromise();
  const [modifyBooking] = useModifyBookingMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const user = useAppSelector(selectAuthUser);

  console.log(booking);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect or confirmation logic
        return_url: `${window.location.origin}`,
        payment_method_data: {
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message as string);
      console.error("Payment confirmation error:", error);
    } else {
      const { carId, _id, ...rest } = booking;

      const data = { ...rest };

      if (paymentIntent.id) {
        data.completedPayment = true;
        data.paymentType = "stripe";
        data.paymentId = paymentIntent.id;

        if (new Date(data.endDate) < today) {
          data.status = "completed";
        }

        const res = (await toastPromise(
          modifyBooking,
          { data, id: _id },
          "Completing payment...",
          "Payment completed!"
        )) as any;

        if (res.success) {
          setStripeDialogOpen(false);
          setPaymentOpen(false);
          navigate("/dashboard/payments", { state: "recent" });
        }
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AnimatePresence>
        <PaymentElement />
        <motion.button
          layout
          type="submit"
          disabled={!stripe || isProcessing}
          className="mt-4 !bg-primary !text-white px-4 py-2 rounded-lg"
        >
          <AnimatePresence>
            {isProcessing ? <span>Processing...</span> : <span>Checkout</span>}
          </AnimatePresence>
        </motion.button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </AnimatePresence>
    </form>
  );
};

export default StripePaymentForm;
