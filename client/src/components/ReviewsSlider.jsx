import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoIosStar as RatingIcon } from "react-icons/io";

export const ReviewsSlider = ({ reviews }) => {
  const slides = reviews?.map(({ id, title, review, rating }) => {
    return (
      <SwiperSlide key={id}>
        <div className=" border border-gray-300 h-57.5 rounded-lg shadow-xl p-4 flex flex-col justify-between gap-3">
          <div className=" border-b border-gray-400 font-inter font-semibold pb-2">
            {title}
          </div>

          <p className=" font-inter h-full">{review}</p>

          <div className=" flex items-center gap-1 ml-auto">
            {rating}
            <RatingIcon size={20} />
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        800: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
    >
      {slides}
    </Swiper>
  );
};
