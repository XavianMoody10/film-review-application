import { House } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { Tv } from "lucide-react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import { useContext } from "react";

export const SideNavigation = () => {
  const sideNavigationContext = useContext(SideNavigationContext);

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: sideNavigationContext.isOpen ? 0 : "-100%" }}
      transition={{ stiffness: 0, ease: "easeInOut" }}
      className=" p-5 bg-linear-to-b from-black to-gray-900 fixed left-0 top-0 h-screen w-full min-[400px]:max-w-[350px] border-r border-gray-60000 shadow-2xl z-30 space-y-4"
    >
      <X
        color="white"
        size={25}
        className=" ml-auto cursor-pointer"
        onClick={() => sideNavigationContext.setIsOpen(false)}
      />

      <nav>
        <ul className=" flex flex-col gap-1.5">
          <li
            className=" border border-gray-700 rounded-sm"
            onClick={() => sideNavigationContext.setIsOpen(false)}
          >
            <Link
              to={"/"}
              className=" flex items-center justify-between gap-2 text-white hover:bg-white hover:text-black duration-150 p-3"
            >
              <House size={30} />
              <span className=" text-lg  font-urbanist tracking-wider">
                Home
              </span>
            </Link>
          </li>

          <li
            className=" border border-gray-700 rounded-sm"
            onClick={() => sideNavigationContext.setIsOpen(false)}
          >
            <Link
              to={"/explore/movie"}
              className=" flex items-center justify-between gap-2 text-white hover:bg-white hover:text-black duration-150 p-3"
            >
              <Clapperboard size={30} />
              <span className=" text-lg  font-urbanist tracking-wider">
                Movie
              </span>
            </Link>
          </li>

          <li
            className=" border border-gray-700 rounded-sm"
            onClick={() => sideNavigationContext.setIsOpen(false)}
          >
            <Link
              to={"/explore/tv"}
              className=" flex items-center justify-between gap-2 text-white hover:bg-white hover:text-black duration-150 p-3"
            >
              <Tv size={30} />
              <span className=" text-lg  font-urbanist tracking-wider">
                TV Shows
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};
