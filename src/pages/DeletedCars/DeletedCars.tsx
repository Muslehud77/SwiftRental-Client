import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

import { Helmet } from "react-helmet-async";


export default function DeletedCars() {
  

  return (
    <Card className="!bg-secondary">
      <Helmet>
        <title>Dashboard | Deleted Products</title>
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">Deleted Products</CardTitle>
        <CardDescription>
          View and recover your deleted products.
        </CardDescription>
      </CardHeader>
     
    </Card>
  );
}
