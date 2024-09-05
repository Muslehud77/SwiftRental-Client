import { Helmet } from "react-helmet-async";

export type TProduct = {
  _id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  ratings: number;
  isDeleted?: boolean;
  images?: string[];
  sales?: number;
};

export default function Inventory() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 text-foreground">
      <Helmet>
        <title>AdventureAlly | Products</title>
      </Helmet>
    </div>
  );
}
