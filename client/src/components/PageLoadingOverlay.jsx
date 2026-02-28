import { AnimatePresence, motion } from "motion/react";
import { ClipLoader } from "react-spinners";

export const PageLoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className=" fixed top-0 h-screen w-full flex items-center justify-center bg-black z-20"
        >
          <ClipLoader color="white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
