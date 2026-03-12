import { useRef, useState } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
import { useInView } from "motion/react";

export const LazyLoadMediaPoster = ({ poster_path }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
  const ref = useRef();
  const inView = useInView(ref, {
    amount: 0.5,
    once: true,
    margin: "0px 0px 300px 0px",
  });

  return (
    <div className=" min-h-50 lg:min-h-75 2xl:min-h-100 relative" ref={ref}>
      {inView && <img src={poster} alt="" onLoad={() => setIsLoaded(true)} />}

      <LoadingOverlay
        isLoading={!isLoaded}
        backgroundColor={"white"}
        iconColor={"black"}
      />
    </div>
  );
};
