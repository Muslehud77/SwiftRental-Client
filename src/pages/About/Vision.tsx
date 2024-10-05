import ImageWithBlurHash from "../../components/ImageWithBlurHash/ImageWithBlurHash";

const Vision = () => {
  return (
    <section className="bg-gray-900/50 pb-10 backdrop-blur-xl">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="hidden w-3/4 lg:flex items-center min-h-screen bg-gray-800/50 ">
          <div className="mt-8  lg:px-28 lg:mt-0">
            <h1 className="text-2xl font-semibold text-white lg:w-72">
              A Message from Our CEO
            </h1>

            <p className="max-w-lg mt-6 text-gray-400">
              "Hello, I'm John Smith, the Founder & CEO of SwiftRental. Our
              mission is to provide you with the best quality car rental
              services to ensure that your journeys are safe, enjoyable, and
              unforgettable. We understand the importance of reliable vehicles
              when you're on the road, and we are dedicated to offering options
              that meet the highest standards of safety and performance. Thank
              you for being a part of our journey. Together, let's embrace the
              adventures that await us."
            </p>

            <h3 className="mt-6 text-lg font-medium text-primary">
              John Smith
            </h3>
            <p className="text-gray-300">Founder & CEO</p>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full min-h-screen px-8 py-10 mx-auto lg:absolute lg:inset-x-0">
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 uppercase italic">
            Our <span className="text-primary">Vision</span>
          </h1>

          <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
            <ImageWithBlurHash
              object="cover"
              className=" rounded-lg overflow-hidden lg:!w-[32rem] !h-96 "
              src="https://i.postimg.cc/cLp8Tj6F/man1.webp"
              blurHash="LBG]8f00yEm+~U9aM|-oJDng%1S6"
            />

            <div className="lg:hidden mt-8 lg:px-10 lg:mt-0">
              <h1 className="text-2xl font-semibold text-white lg:w-72">
                A Message from Our CEO
              </h1>

              <p className="max-w-lg mt-6 text-gray-400">
                "Hello, I'm John Smith, the Founder & CEO of SwiftRental. Our
                mission is to provide you with the best quality car rental
                services to ensure that your journeys are safe, enjoyable, and
                unforgettable. We understand the importance of reliable vehicles
                when you're on the road, and we are dedicated to offering
                options that meet the highest standards of safety and
                performance. Thank you for being a part of our journey.
                Together, let's embrace the adventures that await us."
              </p>

              <h3 className="mt-6 text-lg font-medium text-primary">
                John Smith
              </h3>
              <p className="text-gray-300">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
