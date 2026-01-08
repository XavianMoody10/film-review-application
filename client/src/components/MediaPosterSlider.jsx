import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useFetchMoviesCollectionByList } from "../hooks/useFetchMoviesCollectionByList";
import { motion } from "motion/react";
import { MediaSliderLoadingOverlay } from "./MediaSliderLoadingOverlay";
import { MediaSliderErrorMessageOverlay } from "./MediaSliderErrorMessageOverlay";
import { MediaPoster } from "./MediaPoster";

export const MediaPosterSlider = ({ listValue }) => {
  const query = useFetchMoviesCollectionByList("popular");

  const slides = query.data?.results.map((slide) => {
    const poster = `https://image.tmdb.org/t/p/original${slide.poster_path}`;

    return (
      <SwiperSlide>
        <MediaPoster
          original_title={slide.original_title}
          poster_path={slide.poster_path}
        />
      </SwiperSlide>
    );
  });

  return (
    <div className=" min-h-50 sm:min-h-75 lg:min-h-100 relative">
      <MediaSliderLoadingOverlay isLoading={query.isLoading} />

      {query.isSuccess && (
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {slides}
        </Swiper>
      )}

      {query.isError && <MediaSliderErrorMessageOverlay />}
    </div>
  );
};
