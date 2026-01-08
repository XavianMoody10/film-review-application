import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const Home = () => {
  return (
    <main className=" flex flex-col items-center justify-center gap-10 h-screen p-5">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ stiffness: 0 }}
        className=" text-4xl text-center font-geologica tracking-widest"
      >
        Film Review Application
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, stiffness: 0 }}
        className=" flex gap-3 w-full max-w-87.5"
      >
        <Link
          to={"/movies"}
          className=" font-geologica tracking-wider w-full text-center border border-gray-300 py-2 hover:bg-black hover:text-white duration-150 rounded-sm font-medium"
        >
          Movies
        </Link>
        <Link
          to={"/tv_shows"}
          className=" font-geologica tracking-wider w-full text-center border border-gray-300 py-2 hover:bg-black hover:text-white duration-150 rounded-sm font-medium"
        >
          TV Shows
        </Link>
      </motion.div>
    </main>
  );
};
