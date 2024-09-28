import { ReactNode, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/dark_mode_full.png";

import { useUser } from "../../hooks/useUser";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";

import { motion } from "framer-motion";
import Headroom from "react-headroom";

import User from "../User/User";

export default function Navbar() {
  const { user } = useUser();

  

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const {pathname} = useLocation()


  return (
    <Headroom>
      <header
        className={`${pathname==='/' ? "absolute" : "relative"} z-20 flex w-full items-center justify-between p-5`}
      >
        <Link to="/" className="mr-6 flex items-center">
          <img src={logo} className="w-44" alt="Logo" />
          <span className="sr-only">SwiftRental</span>
        </Link>

        {/* Slide Tabs for Navigation */}
        <motion.nav animate={{}} className="flex-grow flex justify-center">
          <ul
            onMouseLeave={() =>
              setPosition((prev) => ({ ...prev, opacity: 0 }))
            }
            className="relative mx-auto flex w-fit rounded-full  p-1  navbarBoxShadow "
          >
            <Tab setPosition={setPosition} path="/">
              Home
            </Tab>
            <Tab setPosition={setPosition} path="/inventory">
              Inventory
            </Tab>
            <Tab setPosition={setPosition} path="/about">
              About Us
            </Tab>
            <Tab setPosition={setPosition} path="/contact">
              Contact
            </Tab>
            <Cursor position={position} />
          </ul>
        </motion.nav>

        {/* Right-side Menu */}
        <div className="flex items-center gap-4">
          <ThemeChanger />
          {user ? (
            <User />
          ) : (
            <Link to="/login" className="bg-gray-200 py-1 px-4 rounded-md">
              Login
            </Link>
          )}
        </div>
      </header>
    </Headroom>
  );
}

const Tab = ({ children, setPosition, path }:{children:ReactNode,setPosition:(arg:any)=>void,path:string}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className={`relative hover:text-white z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white transition-all duration-500 md:px-5 md:py-3 md:text-sm ${
        pathname === path
          ? "text-bold font-semibold navHoverPillActive rounded-full"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

const Cursor = ({ position }:{position:any}) => {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-7 rounded-full navHoverPill md:h-12"
    />
  );
};
