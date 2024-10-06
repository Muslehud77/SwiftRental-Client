import { useRef, useState } from "react";
import bannerImg from "../../assets/Home/1.png";
import DateTimePicker from "../../components/Searchbar/DateTimePicker";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isMobile } from "../../utils/isMobile";
gsap.registerPlugin(useGSAP);

const Banner = () => {
  const image = useRef<HTMLImageElement|null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        image.current,
        { y: -100, x: 10 },
        {
          y: 0,
          x: 0,

          ease: "expo.out",
          duration: 1,
        }
      );
    },
    {
      scope: image,
    }
  );
  const [showDateTime, setShowDateTime] = useState(false);
  return (
    <motion.div
      data-scroll
      data-scroll-container
      data-scroll-speed={isMobile() ? "0" : "-.8"}
      onClick={() => setShowDateTime(false)}
      className="relative overflow-hidden h-screen  flex flex-col lg:flex-row items-center justify-between -mt-32  md:-mt-24"
    >
      {/* Left Section with Text */}
      <div className="flex flex-col justify-between h-full py-32">
        <div className="text-2xl font-bold text-white"></div>
        <div className="pl-2 md:pl-8 ">
          <motion.h1 className="overflow-hidden inline-block text-4xl md:text-6xl font-bold text-white mt-4 uppercase italic">
            <AnimatedLetters title="Rent with Ease" /> <br />{" "}
            <AnimatedLetters title="Drive with Style" />
          </motion.h1>
          <p className="text-gray-400 text-lg mt-2">Drive the Future, Today!</p>
          <div className="mt-2">
            <DateTimePicker
              showDatePicker={showDateTime}
              setShowDatePicker={setShowDateTime}
              banner={true}
            />
          </div>
        </div>
        <hr className="border-[2px] border-primary hidden lg:flex" />
      </div>
      <img
        ref={image}
        src={bannerImg}
        alt="Luxury Car"
        className="object-cover h-screen hidden md:flex"
      />
    </motion.div>
  );
};

export default Banner;

export const AnimatedLetters = ({ title }: { title: string }) => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        lettersRef.current,
        { y: 80 },
        {
          y: 0,
          stagger: 0.02,
          ease: "expo.out",
          duration: 0.5,
        }
      );
    },
    {
      scope: lettersRef,
    }
  );

  return (
    <span>
      {title.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) lettersRef.current[i] = el;
          }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}{" "}
        </span>
      ))}
    </span>
  );
};
