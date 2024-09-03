import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const MyCartSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-10" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="grid gap-2 mt-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-10" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Order Details</h3>
            <div className="grid gap-2 mt-2">
              <div className="flex items-center justify-between">
                <div>Order Date:</div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between">
                <div>Shipping Address:</div>
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCartSkeleton;