import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logos/dark_mode_full.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-xl">
      <div className="p-5 text-white ">
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <img className="w-44" src={logo} alt="Logo" />
          </a>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <a
              href="#"
              className="mx-4 text-sm  transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {" "}
              Home{" "}
            </a>
            <a
              href="#"
              className="mx-4 text-sm  transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {" "}
              About{" "}
            </a>
            <a
              href="#"
              className="mx-4 text-sm  transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {" "}
              Teams{" "}
            </a>
            <a
              href="#"
              className="mx-4 text-sm  transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {" "}
              Privacy{" "}
            </a>
            <a
              href="#"
              className="mx-4 text-sm  transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>

        <hr className="my-6 border-gray-400 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm  sm:ml-6 sm:mt-0 mt-4">
            © 2024 Musleh —
            <a
              href="https://muslehud77.me/"
              rel="noopener noreferrer"
              className="text-gray-400"
              target="_blank"
            >
              @muslehud77
            </a>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/Musleh.ud/"
              target="_blank"
             
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/muslehud77"
              target="_blank"
              className="ml-3 "
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/muslehud77"
              target="_blank"
              className="ml-3 "
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/muslehud777/"
              target="_blank"
              className="ml-3 "
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
