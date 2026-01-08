import { motion } from "motion/react";

export const MediaPoster = ({ original_title, poster_path }) => {
  const poster = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <div className=" min-h-50 sm:min-h-75 lg:min-h-100 w-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className=" absolute top-0 left-0 bottom-0 right-0 bg-black/55"
      ></motion.div>

      <img src={poster} alt={original_title} width={"100%"} />
    </div>
  );
};
