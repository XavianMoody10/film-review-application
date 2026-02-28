import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { MediaLoadingOverlay } from "./MediaLoadingOverlay";
import { Link } from "react-router-dom";
import { MediaErrorMessageOverlay } from "./MediaErrorMessageOverlay";

export const MediaBackdroplider = ({ queryKey, endpoint, mediaType }) => {
  const ref = useRef();
  const isInView = useInView(ref, { amount: "all", once: true });

  useEffect(() => {
    if (isInView) {
      query.refetch();
    }
  }, [isInView]);

  async function fetchData() {
    try {
      const response = await axios.get(endpoint);
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error getting collection");
    }
  }

  const query = useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime: 300000, // 5 minutes
    enabled: false,
  });

  const slides = query.data?.results?.map(
    ({
      id,
      title,
      original_title,
      original_name,
      release_date,
      backdrop_path,
    }) => {
      const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

      return (
        <SwiperSlide>
          <div className=" space-y-2">
            <img
              src={backdropPath}
              alt=""
              className=" h-45 w-full object-cover object-top"
            />
            <div>
              <div className=" text-white text-lg tracking-wider">
                <Link
                  to={`/details/${mediaType}/${id}`}
                  className=" hover:underline"
                >
                  {title || original_title || original_name}{" "}
                  {release_date && <span>({release_date?.split("-")[0]})</span>}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      ref={ref}
      className=" min-h-45 relative"
    >
      <MediaLoadingOverlay isLoading={query.isLoading || query.isPending} />

      {query.isError && (
        <MediaErrorMessageOverlay message={query.error.message} />
      )}

      {query.isSuccess && (
        <Swiper
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 10 },
            1024: { slidesPerView: 3.1, spaceBetween: 10 },
            1500: { slidesPerView: 4.1, spaceBetween: 10 },
          }}
        >
          {slides}
        </Swiper>
      )}
    </motion.div>
  );
};
