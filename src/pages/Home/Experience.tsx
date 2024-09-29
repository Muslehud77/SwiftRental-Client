import image from "../../assets/Home/(2).png"


const Experience = () => {
  return (
    <div className=" text-white bg-gray-800/50 flex flex-col items-center gap-16 md:pt-20">
      {/* Left side: Experience Info */}
      <div className="pl-2 md:pl-0 flex flex-col gap-10 md:flex-row justify-between items-start md:items-center w-full">
        <h2 className=" md:pl-8 text-5xl md:text-6xl font-bold text-white mt-4 uppercase italic">
          10+ YEARS <br /> EXPERIENCE
        </h2>
        <div>
          <p className="text-gray-300 max-w-lg text-xl mr-20">
            At SwiftRental, we're not just about renting cars—we're about
            delivering unforgettable experiences. With over a decade in the
            industry, we make your road trips smoother, easier, and more
            enjoyable.
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <hr className="border-[2px] border-primary w-3/12" />
      </div>
      <img
        src={image} // Add the actual image URL here
        alt="Happy people in car"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Experience;