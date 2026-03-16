import { motion } from "motion/react";
import { ShieldAlert as ErrorIcon } from "lucide-react";

export const PageActionErrorMessage = ({ isOpen, errorMessage }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: isOpen ? 0 : "-100%" }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 w-full bg-red-600 z-40 py-2 flex items-center justify-center gap-1"
    >
      <span className=" font-urbanist font-semibold text-lg text-white tracking-wider">
        {errorMessage}
      </span>
      <ErrorIcon color="white" />
    </motion.div>
  );
};
