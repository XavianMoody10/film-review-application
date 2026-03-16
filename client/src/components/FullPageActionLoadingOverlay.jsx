import { motion, AnimatePresence } from "motion/react";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { ActionLoadingContext } from "../contexts/ActionLoadingContext";

export const FullPageActionLoadingOverlay = () => {
  const actionLoadingContext = useContext(ActionLoadingContext);

  return (
    <AnimatePresence>
      {actionLoadingContext.isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: actionLoadingContext.isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className=" fixed top-0 left-0 right-0 bottom-0 bg-black/25 h-screen flex items-center justify-center z-30"
        >
          <ClipLoader size={30} color="white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
