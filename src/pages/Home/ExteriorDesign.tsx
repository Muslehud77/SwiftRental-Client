import image from "../../assets/Home/3.png"
import { FaCheckCircle } from "react-icons/fa";

const ExteriorDesignBanner = () => {
  return (
    <div className="relative text-white flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Left side: Text content */}
      <div className="pl-8 lg:flex-1 space-y-6">
        <h2 className="text-6xl font-bold text-white  uppercase italic">
          SPORTY STYLE <br /> EXTERIOR DESIGN
        </h2>

        <div className="space-y-4">
          {/* Feature 1 */}
          <div className="flex items-start space-x-2">
            <FaCheckCircle className="text-orange-500 size-16" />
            <div>
              <h3 className="text-2xl font-bold">Smart, Beautiful Cars</h3>
              <p className="text-gray-300 w-3/4">
                At SwiftRental, our fleet is designed for both comfort and
                style. Choose from a range of high-performance vehicles with
                modern designs.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start space-x-2">
            <FaCheckCircle className="text-orange-500 size-16" />
            <div>
              <h3 className="text-2xl font-bold">The Roads You Travel</h3>
              <p className="text-gray-300 w-3/4">
                Wherever your journey takes you, SwiftRental ensures you drive
                with confidence and ease. Our vehicles are built to handle any
                terrain.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start space-x-2">
            <FaCheckCircle className="text-orange-500 size-16" />
            <div>
              <h3 className="text-2xl font-bold">Who Lives for It</h3>
              <p className="text-gray-300 w-3/4">
                We cater to drivers who live for the thrill of the drive. Our
                cars are designed for performance and excitement on the road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="space-y-20">
        <img
          src={image} // Replace with the actual image URL
          alt="Sporty car"
          className="w-full  object-cover"
        />
     
      </div>
    </div>
  );
};

export default ExteriorDesignBanner;
