import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "“ Renting from SwiftRental has been a game-changer for my travels! The service is top-notch, and the vehicles are always in excellent condition. ”",
    name: "Robbert",
    title: "User since 2020",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
  {
    text: "“ I love the convenience of SwiftRental! Their selection is vast, and the booking process is seamless. Highly recommended! ”",
    name: "Jeny Doe",
    title: "User since 2021",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
  },
  {
    text: "“ The best car rental experience I've ever had! SwiftRental's customer support is exceptional, and their cars are fantastic. ”",
    name: "Mia Brown",
    title: "User since 2019",
    img: "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    text: "“ SwiftRental made my trip unforgettable! The car was perfect for my needs, and the service was outstanding. ”",
    name: "Jenefer Lopez",
    title: "User since 2022",
    img: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    text: "“ Renting from SwiftRental has been a game-changer for my travels! The service is top-notch, and the vehicles are always in excellent condition. ”",
    name: "Robbert",
    title: "User since 2020",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative flex">
      <div className="w-full h-full absolute flex">
        <div className="h-full bg-gray-800/50 md:w-3/4"></div>
        <div className="h-full bg-primary/20 md:w-2/5"></div>
      </div>

      <div className="relative flex flex-col justify-center w-full min-h-screen py-10 pl-2 md:pl-8">
        <h1 className="text-5xl md:text-6xl uppercase font-bold text-white italic">
          What our <span className="text-primary">customers</span> <br /> are
          saying
        </h1>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-full gap-8 mt-8"
            initial={{ x: 0 }}
            animate={{ x: -currentIndex * 350 }} // Use percentage for responsiveness
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-between min-w-80 max-w-80 p-8 rounded-md shadow-lg bg-gray-800"
              >
                <p className="leading-loose  text-gray-400">
                  {testimonial.text}
                </p>

                <div className="flex items-center mt-6 -mx-2">
                  <img
                    className="object-cover mx-2 rounded-full w-14 h-14"
                    src={testimonial.img}
                    alt={testimonial.name}
                  />
                  <div className="mx-2">
                    <h1 className="font-semibold  text-white">
                      {testimonial.name}
                    </h1>
                    <span className="text-sm  text-gray-400">
                      {testimonial.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="items-center  mt-12 md:flex">
          <button
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + testimonials.length) % testimonials.length
              )
            }
            title="left arrow"
            className="p-2 transition-colors duration-300 border rounded-full rtl:-scale-x-100 text-gray-200 border-gray-700 hover:bg-gray-800 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % testimonials.length)
            }
            title="right arrow"
            className="p-2  transition-colors duration-300 border rounded-full rtl:-scale-x-100 text-gray-200 border-gray-700 hover:bg-gray-800 lg:mx-6 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
