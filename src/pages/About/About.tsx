import { useEffect } from "react";

import MeetOurTeam from "./MeetOurTeam";
import scrollToTop from "../../utils/scrollToTop";
import GetInTouch from "./GetInTouch";
import Vision from "./Vision";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Helmet>
        <title>SwiftRental | About</title>
      </Helmet>
      <MeetOurTeam />
      <Vision />
    
      <GetInTouch />
    </div>
  );
};

export default About;
