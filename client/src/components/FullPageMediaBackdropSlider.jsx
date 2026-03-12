import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export const FullPageMediaBackdropSlider = ({ results }) => {
  const slides = results?.map(
    ({ id, backdrop_path, title, original_name, overview, media_type }) => {
      const backdrop = `https://image.tmdb.org/t/p/original${backdrop_path}`;

      return (
        <SwiperSlide key={id}>
          <div
            className=" h-screen bg-center bg-cover relative"
            style={{
              backgroundImage: `url(${backdrop})`,
            }}
          >
            <div className=" absolute top-0 left-0 right-0 bottom-0 bg-black/70">
              <ul className=" absolute bottom-5 left-5 max-w-150 space-y-4">
                <li className=" text-white font-medium text-4xl font-urbanist">
                  <Link
                    to={`/details/${media_type}/${id}`}
                    className=" hover:underline"
                  >
                    {title || original_name}
                  </Link>
                </li>

                <li className=" hidden text-white font-urbanist tracking-wider sm:block">
                  {overview}
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      );
    },
  );

  return <Swiper>{slides}</Swiper>;
};
