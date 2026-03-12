import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "./LoadingOverlay";
import { ErrorMessageOverlay } from "./ErrorMessageOverlay";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const LazyLoadingMediaSlider = ({ queryKey, queryFn, mediaType }) => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
    rootMargin: "0px 0px 800px 0px",
  });

  const query = useQuery({
    queryKey,
    queryFn,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (inView) {
      query.refetch();
    }
  }, [inView]);

  const slides = query.data?.results?.map(
    ({ id, backdrop_path, media_type, title, original_name }) => {
      const backdrop = `https://image.tmdb.org/t/p/original${backdrop_path}`;

      return (
        <SwiperSlide key={id}>
          <div className=" space-y-4">
            <div
              className=" h-50 bg-center bg-cover relative"
              style={{
                backgroundImage: `url(${backdrop})`,
              }}
            />
            <Link
              to={`/details/${media_type || mediaType}/${id}`}
              className=" text-white font-urbanist tracking-widest hover:underline"
            >
              {title || original_name}
            </Link>
          </div>
        </SwiperSlide>
      );
    },
  );

  return (
    <div className=" min-h-50 relative" ref={ref}>
      <Swiper
        breakpoints={{
          100: {
            slidesPerView: 1.1,
          },

          500: {
            slidesPerView: 2.1,
            spaceBetween: 10,
          },

          1024: {
            slidesPerView: 3.1,
            spaceBetween: 10,
          },
        }}
      >
        {slides}
      </Swiper>

      <LoadingOverlay isLoading={query.isLoading} zIndex={99} />
      <ErrorMessageOverlay erorrMessage={query.error?.message} />
    </div>
  );
};
