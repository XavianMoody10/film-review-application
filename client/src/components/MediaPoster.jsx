import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

export const MediaPoster = ({ original_title, poster_path }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
    rootMargin: "0px 400px 400px 0px",
  });

  const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
  const placeHolder = "https://placehold.co/600x900";

  return (
    <div
      className=" min-h-50 min-[500px]:min-h-86.25 sm:min-h-[288.984px] min-[900px]:min-h-[364.984px] lg:min-h-87 w-full relative bg-white"
      ref={ref}
    >
      {inView && (
        <AnimatePresence>
          {!imageIsLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: !imageIsLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className=" absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-white"
            >
              <ClipLoader size={30} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className=" absolute top-0 left-0 bottom-0 right-0 bg-black/70 flex items-center justify-center text-white text-center text-xl font-inter font-medium"
      >
        {original_title}
      </motion.div>

      {inView && (
        <img
          src={poster}
          hidden
          onLoad={() => setImageIsLoaded(true)}
          onError={() => {
            setIsError(true);
            setImageIsLoaded(true);
          }}
        />
      )}

      {!isError ? (
        <img src={poster} alt={original_title} width={"100%"} />
      ) : (
        <img src={placeHolder} alt={original_title} width={"100%"} />
      )}
    </div>
  );
};
