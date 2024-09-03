import { useEffect } from "react";
import Contact from "./Contact";
import MeetOurTeam from "./MeetOurTeam";
import scrollToTop from "../../utils/scrollToTop";
import GetInTouch from "./GetInTouch";
import Vision from "./Vision";
import { Helmet } from "react-helmet-async";

const About = () => {

  useEffect(()=>{
    scrollToTop()
  },[])

  return (
    <>
      <Helmet>
        <title>AdventureAlly | Contact</title>
      </Helmet>
      <MeetOurTeam />
      <Vision />
      <Contact />
      <GetInTouch />
    </>
  );
};

export default About;