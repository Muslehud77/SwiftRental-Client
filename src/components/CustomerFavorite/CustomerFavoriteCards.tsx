import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TProduct } from "../../pages/Inventory/Inventory";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export const CustomerFavoriteCards = ({
  products,
}: {
  products: TProduct[];
}) => {
  const colSpan = (int: number) => {
    if (int === 2) {
      return "md:col-span-4";
    }
    if (int === 3) {
      return "md:col-span-8";
    }
    if (int % 2 === 0) {
      return "md:col-span-8";
    } else {
      return "md:col-span-4";
    }
  };

  return (
    <section className="space-y-5">
      <div className="mb-4 grid grid-cols-12 gap-4">
        {products.map((product, i) => (
          <Link
            to={`/product-details/${product._id}`}
            key={product._id}
            className={`col-span-12 ${colSpan(i)}`}
          >
            <BounceCard>
              <div className="w-full text-white flex justify-center items-center relative">
                <span className="absolute bg-black top-0 right-0 duration-500 opacity-0 group-hover:opacity-100 group-hover:p-2 rounded-full group-hover:-rotate-45">
                  <FaArrowRight />
                </span>
                <img
                  src={(product.images as string[])[0]}
                  className="h-96 object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-4 right-4 top-64 translate-y-8 rounded-t-2xl bg-black/90 p-4 transition-transform duration-200 group-hover:translate-y-4 group-hover:rotate-[2deg] text-white">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="my-2">${product.price.toFixed(2)}</p>
                  <span className="text-sm bg-red-500 p-1 rounded">
                    Sold {product.sales} Times
                  </span>
                </div>
              </div>
            </BounceCard>
          </Link>
        ))}
      </div>
    </section>
  );
};

const BounceCard = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] flex justify-center items-center  overflow-hidden rounded-2xl bg-white p-8 drop-shadow-md ${className}`}
    >
      {children}
    </motion.div>
  );
};
