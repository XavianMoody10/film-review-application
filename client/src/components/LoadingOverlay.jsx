import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "motion/react";

export const LoadingOverlay = ({
  isLoading,
  iconSize,
  iconColor,
  backgroundColor,
  zIndex,
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className=" absolute h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center"
          style={{
            backgroundColor: backgroundColor || "black",
            zIndex: zIndex || 10,
          }}
        >
          <ClipLoader color={iconColor || "white"} size={iconSize || 25} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
