import { AnimatePresence, motion } from "motion/react";
import { ClipLoader } from "react-spinners";

export const MediaSliderLoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ delay: 1 }}
          exit={{ opacity: 0 }}
          className=" absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 bg-white"
        >
          <ClipLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
