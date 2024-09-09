
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";


import ManageUsersSkeleton from "../../components/Skeleton/ManageUserSkeleton";
import { useGetAllUsersQuery } from "../../redux/features/user/userApi";
import ManageUsersTable from "./ManageUsersTable";
import { Helmet } from "react-helmet-async";
export default function Component() {

  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);




const users = data?.data

  return (
    <>
      <Helmet>
        <title>Dashboard | Manage Users</title>
      </Helmet>
      {isLoading || isError || !data? (
        <ManageUsersSkeleton />
      ) : (
        <Card className="w-full  ">
          <CardHeader>
            <CardTitle className="text-2xl">User Management</CardTitle>
            <CardDescription>
              Manage all users on your platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <ManageUsersTable users={users} />
          </CardContent>
        </Card>
      )}
    </>
  );
}


