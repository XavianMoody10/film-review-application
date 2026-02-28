import { Link } from "react-router-dom";
import { MdOutlineLocalMovies as MoviesIcon } from "react-icons/md";
import { MdLiveTv as TVIcon } from "react-icons/md";
import { IoClose as CloseIcon } from "react-icons/io5";
import { motion } from "motion/react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";

export const SideNavigation = () => {
  const sideNavigationContext = useContext(SideNavigationContext);

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: sideNavigationContext.isOpen ? 0 : "-100%" }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 left-0 border-r border-gray-200/15  w-full h-screen max-w-62.5 z-20 bg-linear-to-b from-black to-gray-900 p-3 space-y-3"
    >
      <CloseIcon
        color="white"
        size={30}
        className=" w-fit ml-auto cursor-pointer"
        onClick={() => sideNavigationContext.setIsOpen(false)}
      />

      <nav>
        <ul className=" space-y-3">
          <li
            className=" border border-white/35 flex items-center"
            onClick={() => sideNavigationContext.setIsOpen(false)}
          >
            <Link
              to={"/explore/movie"}
              className=" text-white font-medium tracking-widest rounded-sm w-full flex items-center justify-between p-2 hover:bg-white hover:text-black"
            >
              <span>Movies</span>

              <MoviesIcon size={30} />
            </Link>
          </li>

          <li
            className=" border border-white/35 flex items-center"
            onClick={() => sideNavigationContext.setIsOpen(false)}
          >
            <Link
              to={"/explore/tv"}
              className=" text-white font-medium tracking-widest rounded-sm w-full flex items-center justify-between p-2 hover:bg-white hover:text-black"
            >
              <span>TV Shows</span>

              <TVIcon size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};
