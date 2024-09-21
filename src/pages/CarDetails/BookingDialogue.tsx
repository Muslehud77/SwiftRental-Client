import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { TCar, TData, TResponse } from "../../types/global.type";
import { useAppSelector } from "../../redux/hooks";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import { Input } from "../../components/ui/input";

import { useForm } from "react-hook-form"; // Import react-hook-form
import { useCreateBookingMutation } from "../../redux/features/Booking/bookingApi";
import { useToastPromise } from "../../hooks/useToastPromise";
import { useNavigate } from "react-router-dom";

type BookingFormData = {
  nidOrPassport: string;
  drivingLicense: string;
};

type BookingDialogueProps = {
  car: TCar;
  tripDuration: number;
  dialogueOpen: boolean;
  setDialogueOpen: (arg: boolean) => void;
  totalPrice: number;
  selectedFeatures: { label: string; price: number }[];
};

const BookingDialogue = ({
  car,
  tripDuration,
  dialogueOpen,
  setDialogueOpen,
  totalPrice,
  selectedFeatures,
}: BookingDialogueProps) => {
  const { toastPromise } = useToastPromise();
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();
  const { tripTime, destinationInfo } = useAppSelector(selectLocation);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    const [startDate, endDate] = tripTime;

    const features = selectedFeatures.map((f) => ({
      name: f.label,
      price: f.price,
    }));

    const reservationData = {
      carId: car._id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      additionalFeatures: features,
      totalCost: totalPrice,
      origin: destinationInfo.origin,
      destination: destinationInfo.destination,
      ...data, // Include personal details from form
    };

    const res = (await toastPromise(
      createBooking,
      reservationData,
      "Creating a booking..."
    )) as TData<Record<string, unknown>>;

    if (res?.success) {
      setDialogueOpen(false);
      navigate("/dashboard/my-bookings");
    }

    console.log(res);
  };

  return (
    <Dialog open={dialogueOpen} onOpenChange={setDialogueOpen}>
      <DialogContent className="text-white/80 !bg-primary/20 backdrop-blur-md  p-6 border !border-primary/40 max-h-screen overflow-auto">
        <DialogHeader className="text-white/90">
          <DialogTitle className="text-2xl font-bold text-white">
            Confirm Reservation
          </DialogTitle>
          <DialogDescription className="text-sm text-white/70">
            Please review the details of your reservation and provide the
            required personal and payment information.
          </DialogDescription>
        </DialogHeader>

        {/* Displaying Car and Trip Details */}
        <div className="space-y-2">
          <p className="font-semibold text-lg">
            Car: {car.name} {car.year} {car.model} {car.carType}
          </p>
          <p className="text-sm text-white/80">
            Trip Duration: {Math.floor(tripDuration / 24)} day(s),{" "}
            {tripDuration % 24} hour(s)
          </p>
          <p className="text-sm text-white/80">
            Origin: {destinationInfo.origin || "N/A"}
          </p>
          <p className="text-sm text-white/80">
            Destination: {destinationInfo.destination || "N/A"}
          </p>
        </div>

        {/* Selected Features */}
        <div>
          <p className="font-semibold text-lg">Selected Additional Features:</p>
          <div className="text-sm space-y-1">
            {!selectedFeatures.length ? (
              <p className="text-white/70">N/A</p>
            ) : (
              selectedFeatures.map((feature) => (
                <li key={feature.label} className="text-white/80">
                  {feature.label}: ${feature.price}
                </li>
              ))
            )}
          </div>
        </div>

        {/* Personal Details Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="font-semibold text-lg">Personal Information</p>

          {/* NID/Passport */}
          <Input
            type="text"
            placeholder="NID/Passport"
            {...register("nidOrPassport", {
              required: "NID/Passport is required",
            })}
            className="w-full mt-2 p-2 rounded-md border border-primary/40 bg-background text-white/80 focus:border-primary focus:outline-none"
          />
          {errors.nidOrPassport && (
            <p className="text-red-500 text-sm">
              {errors.nidOrPassport.message}
            </p>
          )}

          {/* Driving License */}
          <Input
            type="text"
            placeholder="Driving License"
            {...register("drivingLicense", {
              required: "Driving License is required",
            })}
            className="w-full mt-2 p-2 rounded-md border border-primary/40 bg-background text-white/80 focus:border-primary focus:outline-none"
          />
          {errors.drivingLicense && (
            <p className="text-red-500 text-sm">
              {errors.drivingLicense.message}
            </p>
          )}

          {/* Total Cost */}
          <div className="mt-2">
            <p className="font-semibold text-lg">
              Total Cost:{" "}
              <span className="text-2xl text-white font-bold">
                ${totalPrice}
              </span>
            </p>
          </div>

          {/* Confirm Button */}
          <div className="mt-2 flex justify-end">
            <Button variant="outline" type="submit">
              Confirm Reservation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialogue;
