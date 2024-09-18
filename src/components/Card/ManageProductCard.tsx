import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";
import { CardContainer, CardItem } from "../../components/ui/3d-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { FiEye } from "react-icons/fi";
import { MdOutlineEditNote } from "react-icons/md";

import { Link } from "react-router-dom";
import { TCar } from "../../types/global.type";
import ModifyStatus from "../ModifyStatus/ModifyStatus";


type ManageProductCardProps = {
  car: TCar;
};

const ManageProductCard = ({ car }: ManageProductCardProps) => {
  return (
    <CardContainer key={car._id}>
      <div className="w-full h-96 max-w-sm mx-auto relative mb-10">
        <ImageWithBlurHash
          object="cover"
          className="rounded-xl overflow-hidden"
          src={car.images[0].url}
          blurHash={car.images[0].blurHash as string}
        />
        <div className="w-full flex justify-center">
          <CardItem
            translateY="10"
            className="absolute -bottom-5 w-56 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800"
          >
            <h3 className="py-2 tracking-wide text-center text-gray-800 uppercase dark:text-white">
              {car.name} {car.model}
            </h3>

            <div className="relative flex bg-gray-200 dark:bg-gray-700">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={`/car-details/${car._id}`}
                      className="duration-200 hover:bg-gray-500 p-2 w-full flex justify-center items-center text-2xl"
                    >
                      <FiEye />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={`/dashboard/edit-car/${car._id}`}
                      className="duration-200 hover:bg-gray-500 p-2 w-full flex justify-center items-center text-2xl"
                    >
                      <MdOutlineEditNote />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Product</p>
                  </TooltipContent>
                </Tooltip>
                <ModifyStatus
                  id={car?._id}
                  isIcon={true}
                  isManual={true}
                  action={car.isDeleted ? "recover" : "delete"}
                  className={
                    "duration-200 hover:bg-gray-500 p-2 w-full flex justify-center items-center text-2xl"
                  }
                />
              </TooltipProvider>
            </div>
          </CardItem>
        </div>
      </div>
    </CardContainer>
  );
};

export default ManageProductCard;
