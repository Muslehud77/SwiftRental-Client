import { TUser } from "../../redux/features/auth/authSlice";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

import { Badge } from "../../components/ui/badge";
import { getInitials } from "../../utils/getInitialsForUserName";
import { convertTimestamp } from './../../utils/convertTimeStamp';
import ManageUserActions from "../../components/ManageUserActions/ManageUserActions";

type ManageUsersTableProps = {
  users:(TUser & {createdAt : string})[]
};

const ManageUsersTable = ({users}:ManageUsersTableProps) => {
  

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user?._id}>
            <TableCell>
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={user?.image} className="object-cover" />
                <AvatarFallback>
                  {getInitials(user?.name as string)}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user?.name}</TableCell>
            <TableCell>{user?.phone ? user.phone : "N/A"}</TableCell>
            <TableCell>{user?.address ? user.address : "N/A"}</TableCell>
            <TableCell>
              <Badge
                variant={user.role === "admin" ? "default" : "outline"}
                className="capitalize"
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={` ${
                  user.status === "in-progress" ? "bg-green-500" : "bg-red-500"
                }  text-gray-50`}
              >
                {user.status === "in-progress" ? "Active" : "Blocked"}
              </Badge>
            </TableCell>
            <TableCell>{convertTimestamp(user?.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
              <ManageUserActions user={user}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsersTable;