import { Helmet } from "react-helmet-async";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { useEffect, useState } from "react";
import { FileUpload } from "../../components/ui/file-upload";

import MultiSelect from "../../components/ui/MultiSelect";
import { sendImageToBB } from "../../utils/sendImageToBB";

export default function AddCar() {
  const [loading,setLoading] = useState(false)

  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<any[]>([]); // State for selected features

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    const carData = { ...data, features: selectedFeatures.map((f) => f.value) };

    if (files.length) {
      const links = await sendImageToBB(files);
      setLinks(links)
    }

    console.log(carData);
  };

  // Available feature options
  const featureOptions = [
    { value: "GPS", label: "GPS" },
    { value: "Air Conditioning", label: "Air Conditioning" },
    { value: "Automatic Transmission", label: "Automatic Transmission" },
    { value: "Bluetooth", label: "Bluetooth" },
    { value: "Parking Sensors", label: "Parking Sensors" },
    { value: "Heated Seats", label: "Heated Seats" },
    { value: "Sunroof", label: "Sunroof" },
  ];

  // Handle change in selected features
  const handleFeatureChange = (selectedOptions: any) => {
    setSelectedFeatures(selectedOptions || []);
  };

  useEffect(() => {
    setSelectedFeatures([featureOptions[0]]);
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>Dashboard | Add Car</title>
      </Helmet>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Car</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Car Name and Model (Flex Row) */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Car Name */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Car Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter car name"
                  {...register("name", { required: "Car name is required" })}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              {/* Car Model */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Car Model
                </label>
                <Input
                  type="text"
                  placeholder="Enter car model"
                  {...register("model", { required: "Car model is required" })}
                />
                {errors.model?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.model.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Car Year and Type (Flex Row) */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Car Year */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Year</label>
                <Input
                  type="number"
                  placeholder="Enter year"
                  {...register("year", {
                    required: "Car year is required",
                    min: { value: 2000, message: "Year must be after 2000" },
                    max: {
                      value: new Date().getFullYear(),
                      message: "Year cannot be in the future",
                    },
                  })}
                />
                {errors.year?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.year.message as string}
                  </p>
                )}
              </div>

              {/* Car Type */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Car Type
                </label>
                <Select
                  onValueChange={(value) => {
                    setValue("carType", value, {
                      shouldValidate: true, // This ensures validation runs
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a car type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.carType?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carType.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              {/* Price Per Hour */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Price Per Hour
                </label>
                <Input
                  type="number"
                  placeholder="Enter price per hour"
                  {...register("pricePerHour", {
                    required: "Price per hour is required",
                  })}
                />
                {errors.pricePerHour?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerHour.message as string}
                  </p>
                )}
              </div>

              {/* Price Per Day */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Price Per Day
                </label>
                <Input
                  type="number"
                  placeholder="Enter price per day"
                  {...register("pricePerDay", {
                    required: "Price per day is required",
                  })}
                />
                {errors.pricePerDay?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerDay.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              {/* Car Color */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Car Color
                </label>
                <Input
                  type="text"
                  placeholder="Enter car color"
                  {...register("carColor", {
                    required: "Car color is required",
                  })}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Features
                </label>
                <MultiSelect
                  onChange={handleFeatureChange}
                  options={featureOptions}
                  value={selectedFeatures}
                  placeholder="Select features"
                />
                {selectedFeatures.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    Please select at least one feature
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                placeholder="Enter car description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
              />
              {errors.description?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            {/* File Upload */}
            <FileUpload onChange={handleFileUpload} />

            {/* Submit Button */}
            <div className="text-right">
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary-dark"
              >
                Add Car
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
