import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";


const App = () => {
  const scrollContainerRef = useRef(null) ;

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainerRef?.current ,
      smooth: true,
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} data-scroll-container>
      <RouterProvider router={router} />
      <CustomCursor />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
