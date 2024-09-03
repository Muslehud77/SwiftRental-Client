
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";


import { Helmet } from "react-helmet-async";

export default function ManageBookings() {
 

  return (
    <Card className="!bg-secondary">
      <Helmet>
        <title>Dashboard | Manage Orders</title>
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">Orders</CardTitle>
        <CardDescription>
          Here you can manage your orders and update their status.
        </CardDescription>
      </CardHeader>

   
    </Card>
  );
}



