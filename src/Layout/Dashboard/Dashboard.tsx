import lightModeOnlyLogo from "../../assets/logos/light_onlyLogo.png";
import darkModeOnlyLogo from "../../assets/logos/dark_onlyLogo.png"
import fullLightLogo from "../../assets/logos/light_mode_full.png";
import fullDarkLogo from "../../assets/logos/dark_mode_full.png";
import { Link, Outlet } from "react-router-dom";

import User from "../../components/User/User";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { ThemeChanger } from "../../components/ThemeChanger/ThemeChanger";
import { useTheme } from "../../components/ThemeProvider";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import { NavRoutes } from "./NavRoutes";
import { isMobile } from "../../utils/isMobile";
import { GridPattern } from "../../components/ui/GridPattern";


gsap.registerPlugin(useGSAP);

export default function Dashboard() {
  const dashNavContainer = useRef(null) as any
  const {actualTheme} = useTheme()
  const [open,setOpen] = useState(true)
  
  useEffect(() => {
    const closeSidebar = setTimeout(() => {
      setOpen(false);
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(closeSidebar);
  }, []);

   useGSAP(
     () => {
       dashNavContainer.current = gsap.timeline().from("a,button,hr", {
         x: -200,
         duration: 0.5,
         delay: 0,
         stagger: 0.1,
         ease: "back.out(1.7)",
       });
     },
     { scope: dashNavContainer }
   );

   const logo =
     actualTheme === "light"
       ? open
         ? fullLightLogo
         : lightModeOnlyLogo
       : open
       ? fullDarkLogo
       : darkModeOnlyLogo;
  

  


  return (
    <div className="flex gap-5 min-h-screen w-full bg-background ">
      <div className={`${open ? "w-56" : "w-0 md:w-16"} duration-500`}>
        <aside
          ref={dashNavContainer}
          className={`${
            !open && "-translate-x-20 md:-translate-x-0"
          } duration-500 fixed z-40 h-screen py-5 px-2 flex flex-col justify-between bg-background `}
        >
          <div className="space-y-5">
            <Link to={"/"} className={` flex justify-center items-center `}>
              <img
                src={logo}
                className={`duration-500 ${open ? "w-44" : "w-10"}`}
              />
            </Link>
            <hr className="border border-gray-400 border-b-1" />
            <NavRoutes open={open} setOpen={setOpen} />
          </div>
          <div className="flex justify-between items-center">
            <User isDashboard={true} />
            {isMobile() && <SidebarOpener open={open} setOpen={setOpen} />}
          </div>
        </aside>
      </div>
      <div className="w-full ">
        <div
          className={`w-full flex  items-end p-1 ${
            open
              ? isMobile()
                ? "justify-end"
                : "justify-between"
              : "justify-between"
          }`}
        >
          {isMobile() ? (
            !open ? (
              <SidebarOpener open={open} setOpen={setOpen} />
            ) : (
              <></>
            )
          ) : (
            <SidebarOpener open={open} setOpen={setOpen} />
          )}

          <ThemeChanger />
        </div>
        <div
          onClick={() => setOpen(false)}
          className=" relative mx-auto mt-4 mr-4 lg:px-10 rounded-xl mb-10 py-8 bg-secondary overflow-hidden "
        >
          <div className="relative bg-background rounded-xl">
            <div className="absolute h-full inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
              <GridPattern />
            </div>
            <div className="relative">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export const SidebarOpener = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  return (
    <IoIosArrowDroprightCircle
      className={`text-3xl text-foreground duration-500 ${
        open && "rotate-180"
      }`}
      onClick={() => setOpen(!open)}
    />
  );
};