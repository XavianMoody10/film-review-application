import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export const FullPageLoadingOverlay = ({ isLoading }) => {
  // Prevents page from scrolling while loading
  useEffect(() => {
    if (isLoading) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className=" fixed top-0 left-0 right-0 bottom-0 bg-black h-screen flex items-center justify-center z-30"
        >
          <ClipLoader size={30} color="white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
