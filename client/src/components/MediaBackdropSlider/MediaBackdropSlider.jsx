import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";

export const MediaBackdropSlider = ({ list = "now_playing", page = "1" }) => {
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
    ({ id, original_title, backdrop_path, overview }) => {
      const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      return (
        <SwiperSlide key={id}>
          <div
            className=" h-175 w-full bg-cover bg-no-repeat bg-center lg:h-212.5"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className=" absolute top-0 left-0 bottom-0 right-0 bg-black/60 flex items-end p-6">
              <ul className=" max-w-175 space-y-3">
                <li className=" text-2xl text-white font-bold tracking-wider min-[800px]:text-3xl">
                  {original_title}
                </li>
                <li className=" text-white text-lg tracking-wider">
                  {overview}
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      );
    },
  );

  return (
    <div className=" h-175 lg:h-212.5 relative">
      {query.isSuccess && <Swiper>{slides}</Swiper>}

      {query.isLoading && (
        <div className=" border-b border-b-gray-300 absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-10">
          <ClipLoader size={30} color="white" />
        </div>
      )}

      {query.isError && (
        <div className=" border-b border-b-gray-300 absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-10">
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
