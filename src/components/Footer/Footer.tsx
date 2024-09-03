import blackLogo from "../../assets/logos/black_without_slogan.png"
import whiteLogo from "../../assets/logos/white_without_slogan.png"
import { useTheme } from "../ThemeProvider";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

  const {actualTheme} = useTheme()

  return (
    <footer className=" bg-background text-muted-foreground ">
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        <img
          src={actualTheme === "dark" ? whiteLogo : blackLogo}
          className="w-20"
        />
        <p className="text-sm text-muted-foreground sm:ml-6 sm:mt-0 mt-4">
          © 2024 Musleh —
          <a
            href="https://muslehud77.netlify.app/"
            rel="noopener noreferrer"
            className="text-gray-600 ml-1"
            target="_blank"
          >
            @muslehud77
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://www.facebook.com/Musleh.ud/"
            target="_blank"
            className="text-muted-foreground"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/muslehud77"
            target="_blank"
            className="ml-3 text-muted-foreground"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/muslehud77"
            target="_blank"
            className="ml-3 text-muted-foreground"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/muslehud777/"
            target="_blank"
            className="ml-3 text-muted-foreground"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
}



