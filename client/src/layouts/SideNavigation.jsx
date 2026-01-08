import { IoClose as CloseIcon } from "react-icons/io5";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const SideNavigation = () => {
  const sideNavigation = useContext(SideNavigationContext);

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: sideNavigation.isOpen ? 0 : "-100%" }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 left-0 w-full h-screen bg-white z-30 p-5 space-y-3 max-w-75 border border-gray-200"
    >
      <CloseIcon
        size={30}
        className=" ml-auto cursor-pointer"
        onClick={() => sideNavigation.setIsOpen(false)}
      />

      <ul className=" flex flex-col gap-3">
        <li>
          <Link
            to={"/movies"}
            className=" block text-lg font-inter font-semibold border border-gray-300 p-2 rounded-sm opacity-55 hover:opacity-100"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to={"/tv"}
            className=" block text-lg font-inter font-semibold border border-gray-300 p-2 rounded-sm opacity-55 hover:opacity-100"
          >
            TV Shows
          </Link>
        </li>
      </ul>
    </motion.aside>
  );
};
