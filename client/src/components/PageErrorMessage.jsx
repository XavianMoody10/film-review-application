import { motion } from "motion/react";

export const PageErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 w-full z-40 bg-red-500 flex justify-center text-lg text-white font-semibold py-3"
    >
      {message}
    </motion.div>
  );
};
