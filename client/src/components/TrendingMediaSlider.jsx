import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoMdInformationCircleOutline as InfoIcon } from "react-icons/io";

export const TrendingMediaSlider = ({ results, height }) => {
  const slidesMap = results?.map(
    ({
      id,
      title,
      original_title,
      original_name,
      overview,
      backdrop_path,
      media_type,
    }) => {
      const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

      return (
        <SwiperSlide>
          <div
            className=" bg-top bg-cover relative"
            style={{ backgroundImage: `url(${backdropPath})`, height }}
          >
            <div className=" absolute top-0 left-0 right-0 bottom-0 bg-black/60 flex items-end p-5">
              <div className=" max-w-125 space-y-3">
                <h2 className=" text-white text-2xl font-bold tracking-wider min-[500px]:text-4xl">
                  {title || original_title || original_name}
                </h2>
                <p className=" text-white text-lg">{overview}</p>
                <Link to={`/details/${media_type}/${id}`}>
                  <div className=" h-12.5 w-12.5 bg-white/10 flex items-center justify-center rounded-full text-white hover:text-black hover:bg-white duration-150">
                    <InfoIcon size={30} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    },
  );

  return (
    <>
      <Swiper
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {slidesMap}
      </Swiper>
    </>
  );
};
