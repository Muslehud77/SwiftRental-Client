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
import { useState } from "react";
import { FileUpload } from "../../components/ui/file-upload";

export default function AddCar() {
    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
    };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    alert("Car added successfully!");
    reset();
  };

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
            <div className="flex flex-wrap space-x-4">
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
            <div className="flex flex-wrap space-x-4">
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
                    register("carType").onChange({ target: { value } });
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

            {/* Price Per Hour */}
            <div>
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

            {/* Features */}
            <div>
              <label className="block text-sm font-medium mb-2">Features</label>
              <Textarea
                placeholder="Enter car features"
                {...register("features", { required: "Features are required" })}
              />
              {errors.features?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.features.message as string}
                </p>
              )}
            </div>


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
