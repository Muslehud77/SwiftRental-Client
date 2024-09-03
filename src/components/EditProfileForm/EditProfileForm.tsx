import ReactDOM from "react-dom/client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useUser } from "../../hooks/useUser";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, TUser } from "../../redux/features/auth/authSlice";
import { useUpdateUserMutation } from "../../redux/features/user/userApi";
import { sendImageToBB } from "../../utils/sendImageToBB";
import { useAppDispatch } from "../../redux/hooks";
import toast from "react-hot-toast";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import CustomCursor from "../CustomCursor/CustomCursor";

type ProfileFormValues = {
  username?: string;
  address?: string;
  phone?: string;
  image?: FileList;
};

const EditProfileForm = () => {
  const dialog = useRef(null);
  const { updateUser, updatingUser: isLoading } = useUpdateUser();

  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>();

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setError(null);

    const updatedDataForUser = {} as Partial<TUser>;

    let image = imageLink;

    if (imageData) {
      if (!imageLink) {
        image = await sendImageToBB(imageData);
        setImageLink(image);
      }
    }

    const saveUserData = async () => {
      if (data.username !== user?.name) {
        updatedDataForUser["name"] = data.username;
      }

      if (data.address !== user?.address) {
        updatedDataForUser["address"] = data.address;
      }

      if (data.phone !== user?.address) {
        updatedDataForUser["phone"] = data.phone;
      }

      if (imageLink || image) {
        updatedDataForUser["image"] = image as string;
      }

      if (Object.keys(updatedDataForUser).length) {
        const res = (await updateUser(updatedDataForUser, false)) as any;

        if (res?.error) {
          setError(res?.error?.message || "Something went wrong");
        } else {
          setOpen(false);
          setImageLink(null);
        }
      }
    };

    await saveUserData();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageData(file);
    } else {
      setImageData(null);
    }
  };

  const handleSubmitter = () => {
    const watchedFields = watch(["username", "address", "phone"]);
    const [username, address, phone] = watchedFields;
    if (
      username !== (user?.name || "") ||
      address !== (user?.address || "") ||
      phone !== (user?.phone || "") ||
      imageData
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={handleSubmitter}
          className="grid gap-4 py-4"
        >
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={user?.name}
              className="col-span-3"
              {...register("username")}
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              defaultValue={user?.address}
              className="col-span-3"
              {...register("address")}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={user?.phone}
              className="col-span-3"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  className="object-contain"
                  src={
                    imageData
                      ? URL.createObjectURL(imageData as Blob)
                      : user?.image
                  }
                />
              </Avatar>
              <Button
                onBlur={handleSubmitter}
                type="button"
                variant="outline"
                size="sm"
              >
                <Label
                  htmlFor="profile-image"
                  className="cursor-pointer md:cursor-none"
                >
                  Change
                </Label>
              </Button>
              <Input
                type="file"
                accept="image/*"
                id="profile-image"
                className="hidden h-1"
                {...register("image")}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {error && <span className="text-red-500 text-center">{error}</span>}
          <DialogFooter>
            <Button
              disabled={submitDisabled || isLoading}
              type="submit"
              className="ml-auto"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
