import { LockClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { signIn } from "../../redux/features/auth/authSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/black-without-branding.png";
import whiteLogo from "../../assets/logos/white-without-branding.png";
import { IoMdHome } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../../components/ThemeProvider";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    // defaultValues: { email: "sheikmuslehud@gmail.com", password: "hello123" },
  });``

  const { actualTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (loginData) => {
    setError("");
    toast.promise(login(loginData), {
      loading: "Logging in...",
      success: (res: any) => {
        if (res.error) {
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
        setError(err.message);
        return <b>{err.message}</b>;
      },
    });
  };

  return (
    <div className="flex text-foreground relative justify-center items-center min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>AdventureAlly | Login</title>
      </Helmet>
      <Link to={"/"} className="absolute left-10 top-10 text-2xl">
        <IoMdHome />
      </Link>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="relative text-center space-y-4">
          <div className="flex flex-col justify-center items-center">
            <img
              src={actualTheme === "dark" ? whiteLogo : logo}
              className="h-20"
            />
            <h2 className="text-center mt-2 text-3xl font-bold tracking-tight text-foreground">
              Sign In
            </h2>
          </div>

          <p className="font-extralight text-sm">
            Join us for an Adventure of a Lifetime – Sign In Now and Explore!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <div className="mt-1 relative">
              <MdMailOutline className="absolute w-5 h-5 text-gray-400 left-3 top-2" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                className="pl-10"
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
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <div className="mt-1 relative">
              <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                className="pl-10"
                {...register("password", { required: "Password is required" })}
              />
              <div
                className="absolute right-3 top-2 cursor-pointer md:cursor-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5 text-gray-400" />
                ) : (
                  <FaEye className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {error && (
            <p className="text-center text-red-500 font-semibold text-base">
              {error}
            </p>
          )}
          <Button disabled={isLoading} type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-center">
            <a href="#" className="text-sm text-primary hover:text-primary/90">
              Forgot your password?
            </a>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-sm text-primary hover:text-primary/90"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
