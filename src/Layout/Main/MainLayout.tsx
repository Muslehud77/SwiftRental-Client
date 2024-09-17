import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";



function MainLayout() {
 

  return (
    <div className=" flex flex-col min-h-screen ">
     

      <Navbar />
      <div
        className={`flex-1 transition all duration-300 `}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
