import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { AnimatePresence ,motion} from "framer-motion";
import { useEffect, useState } from "react";
import Preloader from "../../components/Preloader/Preloader";



function MainLayout() {
   const [loading, setLoading] = useState(true);

   const {state} = useLocation()

   useEffect(() => {

   

    if(state === "fromDashBoard"){
      setLoading(false)}else{

        setTimeout(() => {
          setLoading(false);
        }, 3000); // Simulating a 3-second loading state
      }

   }, []);

  return (
    <motion.div>
      {loading && (
        <motion.div>
          <Preloader />
        </motion.div>
      )}
      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative z-[50]">
              <Navbar />
            </div>
            <Outlet />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MainLayout;
