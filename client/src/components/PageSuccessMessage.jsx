import { motion } from "motion/react";

export const PageSuccessMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 w-full z-40 bg-green-500 flex justify-center text-lg text-white font-semibold py-3"
    >
      {message}
    </motion.div>
  );
};
