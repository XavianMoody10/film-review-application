import { motion } from "motion/react";
import { Check as SuccessIcon } from "lucide-react";

export const PageActionSuccessMessage = ({ isOpen, successMessage }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: isOpen ? 0 : "-100%" }}
      transition={{ stiffness: 0 }}
      className=" fixed top-0 w-full bg-green-600 z-40 py-2 flex items-center justify-center gap-1"
    >
      <span className=" font-urbanist font-semibold text-lg text-white tracking-wider">
        {successMessage}
      </span>
      <SuccessIcon color="white" />
    </motion.div>
  );
};
