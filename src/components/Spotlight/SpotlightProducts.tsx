import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import SpotlightSkeleton from "../Skeleton/SpotlightSkeleton";
import { TProduct } from "../../pages/Inventory/Inventory";
import useCursorController from "../../hooks/useCursorController";
import { FaArrowRight } from "react-icons/fa6";

type SpotlightProps = {
  products: TProduct[];
  isLoading: boolean;
  isError: boolean;
};

const SpotlightProducts = ({
  products,
  isLoading,
  isError,
}: SpotlightProps) => {
  const { mouseLeaveCursorResize } = useCursorController();

  return (
    <div className="flex flex-wrap w-full justify-center md:justify-between gap-10 items-center text-white mb-4">
      {isLoading || isError || !products ? (
        <SpotlightSkeleton />
      ) : (
        products.map((product: TProduct) => (
          <Link
            onClick={mouseLeaveCursorResize}
            to={`/product-details/${product._id}`}
            key={product._id}
            className="h-[40vh] shadow-2xl w-96 relative rounded-xl hover:bg-white duration-500 overflow-hidden group"
          >
            <img
              className="overflow-hidden group-hover:scale-90 duration-300 rounded-2xl w-full h-full object-contain bg-white"
              src={(product.images as string[])[0]}
            />
            <div className="h-full w-full bg-black/50 group-hover:bg-black/20 duration-300 absolute inset-0">
              <div className="h-full  flex flex-col justify-between">
                <div className="flex justify-end p-5">
                  <span className="bg-black duration-500 opacity-0 group-hover:opacity-100 group-hover:p-2 rounded-full group-hover:-rotate-45">
                    <FaArrowRight />
                  </span>
                </div>

                <div
                  className=" bg-gradient-to-b group-hover:translate-y-56 from-transparent to-black gradient p-5 
                  duration-700 space-y-1"
                >
                  <h1 className="text-2xl font-semibold">{product.name}</h1>

                  <div className="flex gap-1 items-center">
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={product?.ratings}
                      readOnly
                    />
                    <span className="font-thin">({product.ratings})</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SpotlightProducts;
