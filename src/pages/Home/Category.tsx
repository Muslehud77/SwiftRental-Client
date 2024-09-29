import { Link } from "react-router-dom";
import suv from "../../assets/Home/5-1.png"
import electric from "../../assets/Home/5-2.png"
import sedan from "../../assets/Home/5-3.png"
import { motion } from "framer-motion";
const Category = () => {

   

  return (
    <div
   
      className="bg-gray-800/50 text-white  flex flex-col items-center gap-16 md:py-20"
    >
      {/* Left side: Experience Info */}
      <h2 className=" md:pl-8 text-5xl md:text-6xl font-bold text-white mt-4 uppercase italic">
        vehicle Types
      </h2>

      <div className="flex justify-between items-center ">
        <Link className="w-96 group relative" to={"/inventory?carType=SUV"}>
          <img src={suv} alt="Happy people in car" className="object-cover" />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 translate-x-[1.90rem] w-[20.8rem] h-5/6 flex justify-center items-center opacity-0 bg-primary/10 shadow-sm backdrop-blur-sm -skew-x-6 text-3xl uppercase -translate-y-1 font-bold italic"
          >
            <h1 className="p-2 rounded">
              Starts from <br /> $110/day
            </h1>
          </motion.div>
        </Link>
        <Link
          className="w-96 group relative"
          to={"/inventory?carType=Electric"}
        >
          <img
            src={electric}
            alt="Happy people in car"
            className="object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute self-end inset-0 translate-x-[1.30rem] w-[20.8rem] h-5/6 flex justify-center items-center opacity-0 bg-primary/10 shadow-sm backdrop-blur-sm -skew-x-6 text-3xl uppercase font-bold italic"
          >
            <h1 className="p-2 rounded">
              Starts from <br /> $240/day
            </h1>
          </motion.div>
        </Link>
        <Link className="w-96 group relative" to={"/inventory?carType=Sedan"}>
          <img src={sedan} alt="Happy people in car" className="object-cover" />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 translate-x-[1.90rem] w-[20.8rem] h-5/6 flex justify-center items-center opacity-0 bg-primary/10 shadow-sm backdrop-blur-sm -skew-x-6 text-3xl uppercase -translate-y-1 font-bold italic"
          >
            <h1 className="p-2 rounded">
              Starts from <br /> $130/day
            </h1>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Category;