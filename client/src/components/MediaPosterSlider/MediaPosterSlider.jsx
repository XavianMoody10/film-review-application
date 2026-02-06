import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { FaArrowLeft as LeftArrow } from "react-icons/fa";
import { FaArrowRight as RightArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

export const MediaPosterSlider = ({
  list = "now_playing",
  page = "1",
  media = "movie",
}) => {
  // Fetch data from api
  async function fetchMediaData() {
    const response = await fetch(
      `http://localhost:3000/movies/${list}/${page}`,
    );

    if (!response.ok) {
      throw new Error("Error getting movies now playing");
    }

    const data = await response.json();

    return data;
  }

  const query = useQuery({
    queryKey: [list, page],
    queryFn: fetchMediaData,
    retry: false,
    gcTime: 0,
    staleTime: 0,
  });

  const slides = query.data?.results.map(
    ({ id, original_title, poster_path }) => {
      const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
      return (
        <SwiperSlide key={id}>
          <Link
            to={`/details/${media}/${id}`}
            className=" min-h-62.5 w-full bg-cover bg-no-repeat bg-center"
          >
            <img src={posterUrl} alt={original_title} className=" w-full" />
            <div className=" absolute top-0 left-0 bottom-0 right-0 bg-black/60 flex items-end p-6 opacity-0 hover:opacity-100 duration-150"></div>
          </Link>
        </SwiperSlide>
      );
    },
  );

  return (
    <div className=" min-h-62.5 relative">
      {query.isSuccess && (
        <div className=" relative">
          <button className=" absolute left-0 top-0 h-full px-1.5 z-10 bg-black/5 backdrop-blur-lg opacity-50 hover:opacity-100">
            <LeftArrow size={30} color="white" />
          </button>

          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              600: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1500: {
                slidesPerView: 5,
              },
            }}
          >
            {slides}
          </Swiper>
          <button className=" absolute right-0 top-0 h-full px-1.5 z-10 bg-black/5 backdrop-blur-lg opacity-50 hover:opacity-100">
            <RightArrow size={30} color="white" />
          </button>
        </div>
      )}

      {query.isLoading && (
        <div className=" border border-white/20 absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-10">
          <ClipLoader size={30} color="white" />
        </div>
      )}

      {query.isError && (
        <div className=" border border-white/20 absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-10">
          <div className=" w-full max-w-87.5">
            <div className=" bg-red-500 font-semibold py-3 w-full tracking-wider text-center text-white flex items-center justify-center gap-1.5 rounded-md">
              {query.error.message}
              <ErrorIcon size={30} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
