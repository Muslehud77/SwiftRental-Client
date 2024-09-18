import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { AnimatePresence } from "framer-motion";



function MainLayout() {
 

  return (
    <div className=" flex flex-col min-h-screen ">
      <Navbar />
      <div className={`flex-1 transition all duration-300 `}>
        <AnimatePresence initial={false}>
          <Outlet />
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
