
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";

const ContactUs = () => {

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  return (
    <section>
      <div className=" px-6 py-12 mx-auto">
        <div>
          <h1 className=" text-5xl md:text-6xl font-bold text-white mt-4 uppercase italic">
            Chat to our <br /> friendly team
          </h1>
          <p className="mt-3 text-white/80">
            We’d love to hear from you. Please fill out this form or shoot us an
            email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <span className="inline-block p-3 text-white rounded-full bg-blue-100/80 dark:bg-gray-800">
                <MdEmail className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-base font-medium text-white">Email</h2>
              <p className="mt-2 text-sm text-white/80">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-gray-100">
                support@SwiftRental.com
              </p>
            </div>

            <div>
              <span className="inline-block p-3 text-white rounded-full bg-blue-100/80 dark:bg-gray-800">
                <FaRegComments className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-base font-medium text-white">
                Live chat
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-gray-100">
                Start new chat
              </p>
            </div>

            <div>
              <span className="inline-block p-3 text-white rounded-full bg-blue-100/80 dark:bg-gray-800">
                <MdLocationOn className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-base font-medium text-white">Office</h2>
              <p className="mt-2 text-sm text-white/80">
                Come say hello at our office HQ.
              </p>
              <p className="mt-2 text-sm text-gray-100">
                100 Smith Street Collingwood VIC 3066 AU
              </p>
            </div>

            <div>
              <span className="inline-block p-3 text-white rounded-full bg-blue-100/80 dark:bg-gray-800">
                <MdPhone className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-base font-medium text-white">Phone</h2>
              <p className="mt-2 text-sm text-white/80">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className="mt-2 text-sm text-gray-100">
                +1 (555) 000-0000
              </p>
            </div>
          </div>

          <div className="p-4 py-6 rounded-lg bg-primary/50 backdrop-blur-xl border border-primary/20 md:p-8">
            <form>
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John "
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm text-white">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="w-full mt-4">
                <label className="block mb-2 text-sm text-white">
                  Message
                </label>
                <textarea
                  className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Message"
                ></textarea>
              </div>

             <Button className="w-full mt-5">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
