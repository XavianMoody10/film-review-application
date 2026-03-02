import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CastProfileCard } from "./CastProfileCard";

export const MediaCastSlider = ({ cast }) => {
  // Display cast to UI
  const creditsMap = cast?.map((cast) => {
    if (cast.profile_path) {
      return (
        <SwiperSlide key={cast.cast_id}>
          <CastProfileCard
            profile_path={cast.profile_path}
            name={cast.name}
            character={cast.character}
          />
        </SwiperSlide>
      );
    }
  });

  return (
    <Swiper
      spaceBetween={10}
      breakpoints={{
        400: {
          slidesPerView: 2.1,
        },
        640: {
          slidesPerView: 3.2,
        },
        1280: {
          slidesPerView: 4.2,
        },
      }}
    >
      {creditsMap}
    </Swiper>
  );
};
