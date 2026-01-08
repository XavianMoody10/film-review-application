import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const MediaBackdropSlider = ({ results }) => {
  const slides = results.map((slide) => {
    const backdrop = `https://image.tmdb.org/t/p/original${slide.backdrop_path}`;

    return (
      <SwiperSlide>
        <div
          className=" h-[90vh] w-full bg-center bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url(${backdrop})` }}
        >
          <div className=" absolute top-0 left-0 bottom-0 right-0 bg-black/65 flex p-5 sm:p-10">
            <div className=" flex flex-col justify-end gap-3 max-w-175">
              <h2 className=" font-inter font-extrabold text-white text-2xl tracking-wider sm:text-3xl sm:font-medium">
                {slide.original_title || slide.name}
              </h2>
              <p className=" font-inter text-white text-lg leading-loose hidden sm:block">
                {slide.overview}
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return <Swiper grabCursor>{slides}</Swiper>;
};
