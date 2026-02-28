import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "motion/react";

export const MediaLoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className=" absolute top-0 right-0 left-0 bottom-0 w-full flex items-center justify-center text-white z-10 bg-black"
        >
          <ClipLoader color="white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
