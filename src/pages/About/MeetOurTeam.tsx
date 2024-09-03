import { FaFacebook, FaWhatsapp, FaInstagramSquare } from "react-icons/fa";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

const MeetOurTeam = () => {
  return (
    <section className="bg-background text-foreground">
      <div className="text-center py-10 container mx-auto">
        
        <h1 className="text-3xl md:text-5xl font-light  mb-4">Meet Our Team</h1>
        <p className="text-xl font-light leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          Meet the dedicated team behind AdventureAlly.
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-foreground inline-flex"></div>
        </div>

        <div className=" grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <Drawer>
              <DrawerTrigger className="flex flex-col items-center p-8 transition-colors duration-300 transform group hover:bg-primary rounded-xl">
                <img
                  className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                  src={member.photo}
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                  {member.name}
                </h1>

                <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                  {member.role}
                </p>

                <div className="flex mt-3 -mx-2">
                  <a
                    href="#"
                    className="mx-2 text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Reddit"
                  >
                    <FaInstagramSquare />
                  </a>

                  <a
                    href="#"
                    className="mx-2 text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>

                  <a
                    href="#"
                    className="mx-2 text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Github"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </DrawerTrigger>
              <DrawerContent className="text-foreground">
                <DrawerHeader>
                  <DrawerTitle>{member.name}</DrawerTitle>
                  <DrawerDescription>{member.bio}</DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;

export const team = [
  {
    name: "John Smith",
    role: "Founder & CEO",
    photo: "https://i.postimg.cc/cLp8Tj6F/man1.webp",
    bio: "John is a seasoned outdoor enthusiast with over 20 years of camping experience. He founded AdventureAlly to share his passion and knowledge with fellow adventurers.",
  },
  {
    name: "Jane Doe",
    role: "Marketing Director",
    photo: "https://i.postimg.cc/RF9JxH7f/man2.webp",
    bio: "Jane brings a wealth of experience in digital marketing and is dedicated to connecting our brand with the outdoor community.",
  },
  {
    name: "Mike Johnson",
    role: "Product Manager",
    photo: "https://i.postimg.cc/cJftzmn0/man3.jpg",
    bio: "Mike oversees product selection and ensures we offer only the best gear. He is always on the lookout for innovative camping products.",
  },
  {
    name: "Emily Davis",
    role: "Customer Support Lead",
    photo: "https://i.postimg.cc/Y93GrCRP/man4.jpg",
    bio: "Emily is committed to providing top-notch customer service and ensuring our customers have the best shopping experience.",
  },
  {
    name: "David Brown",
    role: "Warehouse Manager",
    photo: "https://i.postimg.cc/QCdBHZnd/man5.avif",
    bio: "David manages our warehouse operations, ensuring orders are processed efficiently and accurately.",
  },
  {
    name: "Susan White",
    role: "Finance Manager",
    photo: "https://i.postimg.cc/44W7jnm7/women1.avif",
    bio: "Susan oversees all financial aspects of the company, ensuring we remain fiscally strong and can continue to grow.",
  },
  {
    name: "Tom Harris",
    role: "Operations Manager",
    photo: "https://i.postimg.cc/QCYF7YRk/man6.avif",
    bio: "Tom is responsible for the day-to-day operations, making sure everything runs smoothly from supply chain management to customer delivery.",
  },
  {
    name: "Lisa Green",
    role: "Content Creator",
    photo: "https://i.postimg.cc/HsjcmHyS/women2.avif",
    bio: "Lisa creates engaging content that resonates with our audience, from blog posts to social media updates, all while highlighting our products.",
  },
];
