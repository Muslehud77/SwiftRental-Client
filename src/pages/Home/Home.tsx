import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Spotlight from "./Spotlight";
import CustomerFavorites from "../../components/CustomerFavorite/CustomerFavorite";
import CustomerReview from "./CustomerReview";
import ShopByCategory from "./ShopByCategory";
import FaqSection from "./FaqSection";
import ExploreOutdoors from "./ExploreOutdoors";
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
        <title>AdventureAlly</title>
      </Helmet>
      
    </div>
  );
};

export default Home;
