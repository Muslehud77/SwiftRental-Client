
import { Helmet } from "react-helmet-async";

export default function AddCar() {
 
  return (
    <div className="container mx-auto px-10 rounded-xl mb-10 py-8 max-w-3xl text-foreground bg-secondary">
      <Helmet>
        <title>Dashboard | Add Product</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
  
    </div>
  );
}
