import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef } from "react";
import { ClipLoader } from "react-spinners";

export const MediaPoster = ({ poster_path, alt, minHeight }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { amount: "some", once: true });

  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <div
      className=" relative"
      ref={ref}
      style={{ minHeight: minHeight || 500 }}
    >
      <AnimatePresence>
        {!isInView && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isInView ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
            className=" absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center border border-white/10"
          >
            <ClipLoader color="white" />
          </motion.div>
        )}
      </AnimatePresence>
      <img src={posterPath} alt={alt} className=" w-full" />
    </div>
  );
};
