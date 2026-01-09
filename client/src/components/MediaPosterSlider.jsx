import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MediaSliderLoadingOverlay } from "./MediaSliderLoadingOverlay";
import { MediaSliderErrorMessageOverlay } from "./MediaSliderErrorMessageOverlay";
import { MediaPoster } from "./MediaPoster";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export const MediaPosterSlider = ({ event, media, listValue }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "0px 0px 500px 0px",
  });

  const query = event(listValue, inView);

  const slides = query.data?.results.map((slide) => {
    return (
      <SwiperSlide key={slide.id}>
        <Link to={`/${media}/details/${slide.id}`}>
          <MediaPoster
            original_title={slide.original_title}
            poster_path={slide.poster_path}
          />
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <div
      ref={ref}
      className="min-h-50 min-[500px]:min-h-86.25 sm:min-h-[288.984px] min-[900px]:min-h-[364.984px] lg:min-h-87 relative"
    >
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
