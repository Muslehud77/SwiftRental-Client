
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Avatar,  AvatarFallback } from "../../components/ui/avatar";
import { Label } from "../../components/ui/label";

import { useUser } from "../../hooks/useUser";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { getInitials } from "../../utils/getInitialsForUserName";
import { Helmet } from "react-helmet-async";
import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";

export default function Profile() {

  const {user} = useUser()


  return (
    <div className="flex  items-center justify-center rounded-xl   md:h-[90vh]">
      <Helmet>
        <title>Dashboard | {user?.name}</title>
      </Helmet>
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-4 bg-zinc-800/50 text-gray-100 py-8 rounded-t-lg">
          <Avatar className="h-20 w-20">
            {user?.image?.url ? (
              <ImageWithBlurHash
                src={user?.image?.url as string}
                blurHash={user?.image?.blurHash}
                object="contain"
                className=" bg-black "
              />
            ) : (
              <AvatarFallback className="!text-foreground">
                {getInitials(user?.name as string)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground lowercase">
              @{user?.name.split(" ").join("")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <p>{user?.email}</p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <p>{user?.address ? user.address : "N/A"}</p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <p>{user?.phone ? user.phone : "N/A"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <EditProfileForm />
        </CardFooter>
      </Card>
    </div>
  );
}



