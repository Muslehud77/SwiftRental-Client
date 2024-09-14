import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";
import { useTheme } from "./components/ThemeProvider";
import { useJsApiLoader } from "@react-google-maps/api";
import { useAppDispatch } from "./redux/hooks";
import { setMapLoaded } from "./redux/features/Map/mapSlice";


const App = () => {
  const dispatch = useAppDispatch()
  const scrollContainerRef = useRef(null);
  const {actualTheme} = useTheme()
 

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places"]
  });

  useEffect(()=>{
    dispatch(setMapLoaded({mapLoaded:isLoaded}))
  },[isLoaded])

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainerRef?.current,
      smooth: true,
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  const color = actualTheme === "dark" ? "white" : "black";
  const backgroundColor = actualTheme === "dark" ? "#100D12" : "#FFFBF0";

  return (
    <div ref={scrollContainerRef} data-scroll-container>
      <RouterProvider router={router} />
      <CustomCursor />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            color,
            backgroundColor,
          },
        }}
      />
    </div>
  );
};

export default App;
