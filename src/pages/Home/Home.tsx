import { Helmet } from "react-helmet-async";

import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";

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
    <div ref={scrollContainerRef}>
      <Helmet>
        <title>SwiftRental</title>
      </Helmet>
    </div>
  );
};

export default Home;
