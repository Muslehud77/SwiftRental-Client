import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { FiPackage } from "react-icons/fi";
const TopSellingTable = ({ sales }:{sales:Record<string,unknown>[]}) => {
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Top Selling Products
        </CardTitle>
        <FiPackage className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales?.map((sale) => (
              <TableRow key={sale?._id as string}>
                <TableCell className="font-medium">
                  {sale?.name as string}
                </TableCell>
                <TableCell className="text-right">{sale?.sales as number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSellingTable;
