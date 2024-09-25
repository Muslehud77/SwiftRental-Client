import { useState } from "react";
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
import { convertTimestamp } from "./../../utils/convertTimeStamp";
import ManageUserActions from "../../components/ManageUserActions/ManageUserActions";

// Import ShadCN components
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

type ManageUsersTableProps = {
  users: (TUser & { createdAt: string })[];
};

const ManageUsersTable = ({ users }: ManageUsersTableProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filtered and searched users
  const filteredUsers = users.filter((user) => {
    // Search based on name, email, or phone
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));

    // Filter based on role
    const roleMatch = filterRole === "all" ? true : user.role === filterRole;

    // Filter based on status
    const statusMatch =
      filterStatus === "all"
        ? true
        : user.status ===
          (filterStatus === "active" ? "in-progress" : "blocked");

    return searchMatch && roleMatch && statusMatch;
  });

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex justify-between items-center py-4 space-x-4">
        {/* Search */}
        <Input
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />

        {/* Role Filter */}
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
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
          {filteredUsers.map((user) => (
            <TableRow key={user?._id}>
              <TableCell>
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={user?.image?.url} className="object-cover" />
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
                  className={`${
                    user.status === "in-progress"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }  text-gray-50`}
                >
                  {user.status === "in-progress" ? "Active" : "Blocked"}
                </Badge>
              </TableCell>
              <TableCell>{convertTimestamp(user?.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ManageUserActions user={user} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsersTable;
