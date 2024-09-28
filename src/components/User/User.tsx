import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectAuthUser } from "../../redux/features/auth/authSlice";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../../utils/getInitialsForUserName";
import ImageWithBlurHash from "../ImageWithBlurHash/ImageWithBlurHash";

type UserProps = {
  isDashboard?: boolean;
};

const User = ({ isDashboard }: UserProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const user = useAppSelector(selectAuthUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex justify-center items-center gap-2 userPill  p-1 rounded-full bg-transparent">
          <Avatar>
            {user?.image?.url ? (
              <ImageWithBlurHash
                src={user?.image?.url as string}
                blurHash={user?.image?.blurHash}
                object="contain"
                className="rounded-full size-10 object-contain bg-black "
              />
            ) : (
              <AvatarFallback className="!text-foreground">
                {getInitials(user?.name as string)}
              </AvatarFallback>
            )}
          </Avatar>
          <h1 className="text-white">{user?.name}</h1>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isDashboard ? "start" : "end"}>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {pathname.includes("dashboard") ? (
          <Link to="/" className="w-full">
            <DropdownMenuItem>Home</DropdownMenuItem>
          </Link>
        ) : (
          <Link to="/dashboard" className="w-full">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}
        <Link className="w-full" to="/" onClick={() => dispatch(logout())}>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
