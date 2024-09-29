import { Helmet } from "react-helmet-async";

import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";
import Banner from "./Banner";
import Experience from "./Experience";
import ExteriorDesignBanner from "./ExteriorDesign";

const Home = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollContainerRef.current,
        smooth: true,
      });

      return () => {
        locomotiveScroll.destroy();
      };
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="bg-gray-900/50 backdrop-blur-xl"
    >
      <Helmet>
        <title>SwiftRental</title>
      </Helmet>
      <Banner />
      <Experience/>
      <ExteriorDesignBanner/>
    </div>
  );
};

export default Home;
