import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ImageIcon } from "@radix-ui/react-icons";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { sendImageToBB } from "../../utils/sendImageToBB";
import { useSignUpMutation } from "../../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { signIn } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { Helmet } from "react-helmet-async";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [imageData, setImageData] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [error, setError] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setError("");
    const { name, email, password } = data;

    let image = imageLink;

    if (imageData && !imageLink) {
      image = await sendImageToBB(imageData as File);
      setImageLink(image);
    }

    const userData = {
      name,
      email,
      password,
      image,
    };

    toast.promise(signUp(userData), {
      loading: "Logging in...",
      success: (res: any) => {
        if (res?.error) {
          throw new Error(res?.error?.data?.message);
        }

        dispatch(signIn({ user: res?.data?.data, token: res?.data?.token }));

        return (
          <p className="font-bold text-gray-500">
            {res?.data?.data?.name} Welcome!
          </p>
        );
      },
      error: (err) => {
        if (err.message === "Duplicate") {
          setError("User already exist with this email!");
          return <b>User already exist with this email!</b>;
        } else {
          setError(err.message);
          return <b>{err.message}</b>;
        }
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageData(file);
    } else {
      setImageData(null);
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-secondary text-foreground">
      <Helmet>
        <title>AdventureAlly | Register</title>
      </Helmet>
      <Link to={"/"} className="absolute left-10 top-10 text-2xl">
        <IoMdHome />
      </Link>
      <Card className="w-full max-w-2xl flex flex-col md:flex-row shadow-lg gap-8 p-6 md:p-8 lg:p-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">
              Get started by filling out the form below.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <div
                  className="absolute right-4 top-2 cursor-pointer md:cursor-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FaEye className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-center text-red-500 font-semibold text-base">
                {error}
              </p>
            )}
            <Button disabled={isLoading} type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-center text-muted-foreground">
              Have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Upload Profile Image</h2>
            <p className="text-muted-foreground">
              Choose an image to represent your account.
            </p>
          </div>
          <div className="flex items-center justify-center bg-muted rounded-lg p-4 h-46 border">
            <Input
              type="file"
              accept="image/*"
              id="profile-image"
              className="hidden h-1"
              {...register("image")}
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-image"
              className="flex flex-col items-center justify-center gap-2 cursor-pointer md:cursor-none"
            >
              {imageData ? (
                <>
                  <img
                    src={URL.createObjectURL(imageData as Blob)}
                    alt="Selected"
                    className="w-full max-h-40 object-cover mx-auto mt-4 rounded-lg"
                  />
                </>
              ) : (
                <>
                  {" "}
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <span className="text-muted-foreground">Upload Image</span>
                </>
              )}
            </label>
          </div>

          {imageData && (
            <div className="text-center">
              <Button
                onClick={() => {
                  setImageData(null);
                  setImageLink("");
                }}
                variant="outline"
              >
                Remove Image
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Register;
