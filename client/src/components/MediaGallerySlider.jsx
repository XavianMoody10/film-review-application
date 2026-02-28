import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const MediaGallerySlider = ({ backdrops }) => {
  // Display images to UI
  const imagesMap = backdrops?.map((image) => {
    const profilePath = `https://image.tmdb.org/t/p/original${image.file_path}`;

    if (image.file_path) {
      return (
        <SwiperSlide key={image.file_path}>
          <img src={profilePath} alt={image.file_path} className=" w-full" />
        </SwiperSlide>
      );
    }
  });

  return (
    <Swiper
      spaceBetween={10}
      breakpoints={{
        400: {
          slidesPerView: 2,
        },
      }}
    >
      {imagesMap}
    </Swiper>
  );
};
