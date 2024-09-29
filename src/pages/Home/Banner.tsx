
import { useState } from "react";
import bannerImg from "../../assets/Home/1.png"
import DateTimePicker from "../../components/Searchbar/DateTimePicker";

const Banner = () => {
  const [showDateTime,setShowDateTime] = useState(false)
  return (
    <div onClick={()=>setShowDateTime(false)} className="relative h-screen  flex flex-col md:flex-row items-center justify-between -mt-32  md:-mt-24">
      {/* Left Section with Text */}
      <div className="flex flex-col justify-between h-full py-32">
        <div className="text-2xl font-bold text-white"></div>
        <div className="pl-2 md:pl-8 ">
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 uppercase italic">
            Rent with Ease <br /> Drive with Joy
          </h1>
          <p className="text-gray-400 text-lg mt-2">Drive the Future, Today!</p>
          <div className="mt-2">
            <DateTimePicker showDatePicker={showDateTime} setShowDatePicker={setShowDateTime} banner={true}/>
          </div>
        </div>
        <hr className="border-[2px] border-primary hidden md:flex"/>
      </div>

      <img
        src={bannerImg}
        alt="Luxury Car"
        className="object-cover h-screen hidden md:flex"
      />
    </div>
  );
};

export default Banner;
