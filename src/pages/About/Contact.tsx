import { useTheme } from "../../components/ThemeProvider";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const Contact = () => {
  const { actualTheme } = useTheme();

  return (
    <div className=" body-font relative text-foreground ">
      <div className="absolute inset-0 bg-gray-300">
        <iframe
          className={`hover:opacity-100 duration-500 ${
            actualTheme === "dark" ? "invert-[90%]" : ""
          }`}
          width="100%"
          height="100%"
          title="map"
          scrolling="no"
          src="https://www.google.com/maps/d/u/0/embed?mid=1BlwRDk0HtbRoTx6e2Y61SYhfogz9e8k&ehbc=2E312F&noprof=1"
        ></iframe>
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-secondary rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className=" text-2xl mb-1 font-light title-font">Feedback</h2>
          <p className="leading-relaxed mb-5 font-extralight">
            Your feedback helps us improve our products and services. Please let
            us know about your experience with AdventureAlly.com. We appreciate
            your thoughts and suggestions!
          </p>
          <div className="relative mb-4">
            <label className="leading-7 text-sm ">Email</label>
            <Input type="email" id="email" name="email" />
          </div>
          <div className="relative mb-4">
            <label className="leading-7 text-sm ">Message</label>
            <Textarea
              id="message"
              name="message"
              className="w-full bg-background rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none  py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></Textarea>
          </div>
          <button className=" bg-primary text-white border-0 py-2 px-6 focus:outline-none  rounded text-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
