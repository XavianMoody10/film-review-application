import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { FaStar as RatingIcon } from "react-icons/fa6";

export const Details = () => {
  const { mediaType, mediaId } = useParams();

  async function fetchDetails() {
    const url = `http://localhost:3000/details/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting details");
    }
  }

  async function fetchCredits() {
    const url = `http://localhost:3000/credits/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting credits");
    }
  }

  async function fetchImages() {
    const url = `http://localhost:3000/images/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting images");
    }
  }

  async function fetchReviews() {
    const url = `http://localhost:3000/reviews/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting reviews");
    }
  }

  const detailsQuery = useQuery({
    queryKey: ["details", mediaType, mediaId],
    queryFn: fetchDetails,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const creditsQuery = useQuery({
    queryKey: ["credits", mediaType, mediaId],
    queryFn: fetchCredits,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const imagesQuery = useQuery({
    queryKey: ["images", mediaType, mediaId],
    queryFn: fetchImages,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", mediaType, mediaId],
    queryFn: fetchReviews,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const title =
    detailsQuery.data?.title ||
    detailsQuery.data?.original_title ||
    detailsQuery.data?.original_name;

  const overview = detailsQuery.data?.overview;
  const posterPath = `https://image.tmdb.org/t/p/original${detailsQuery.data?.poster_path}`;

  const creditsMap = creditsQuery.data?.cast?.map(
    ({ cast_id, name, profile_path }) => {
      const profilePath = `https://image.tmdb.org/t/p/original${profile_path}`;

      if (profile_path) {
        return (
          <SwiperSlide key={cast_id}>
            <div className=" flex flex-col items-center gap-2">
              <img src={profilePath} alt="" className=" w-full" />
              <span className=" text-white tracking-wider">{name}</span>
            </div>
          </SwiperSlide>
        );
      }
    },
  );

  const imagesMap = imagesQuery.data?.backdrops?.map(({ file_path }) => {
    const profilePath = `https://image.tmdb.org/t/p/original${file_path}`;
    console.log(profilePath);

    if (file_path) {
      return (
        <SwiperSlide key={file_path}>
          <div className="">
            <img src={profilePath} alt="" className=" w-full" />
          </div>
        </SwiperSlide>
      );
    }
  });

  const reviewsMap = reviewsQuery.data?.map(
    ({ id, rating, review, reviewer }) => {
      return (
        <SwiperSlide key={id}>
          <div className=" bg-transparent rounded-md space-y-3">
            <div className=" border-b border-b-gray-200 pb-2 flex items-center justify-between">
              <span className=" text-2xl tracking-wider font-bold text-white">
                {reviewer}
              </span>

              <div className=" flex gap-2">
                <span className=" text-xl text-white">{rating}</span>
                <RatingIcon size={25} color="white" />
              </div>
            </div>

            <p className=" tracking-wider text-white">{review}</p>
          </div>
        </SwiperSlide>
      );
    },
  );

  return (
    <>
      <header className=" fixed top-0 w-full px-3 py-2 z-20">
        <Hamburger color="white" size={20} />
      </header>

      <AnimatePresence>
        {detailsQuery.isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: detailsQuery.isLoading ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className=" fixed top-0 h-screen w-full flex items-center justify-center bg-black z-20"
          >
            <ClipLoader color="white" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-linear-to-b from-black to-gray-900 min-h-screen flex flex-col items-center justify-center py-10">
        <div className=" w-full flex flex-col items-center justify-center gap-10 p-5 lg:flex-row lg:gap-40 lg:items-start">
          <div className=" lg:sticky lg:top-5">
            <div className=" w-full max-w-87.5 lg:w-125">
              <img src={posterPath} alt="" className=" w-full" />
            </div>
          </div>

          <div className=" w-full lg:min-w-100 lg:max-w-200">
            <div className=" space-y-12">
              <h1 className=" text-white text-3xl font-bold tracking-wider xl:text-5xl">
                {title}
              </h1>

              <div className=" space-y-14">
                <div className=" space-y-5">
                  <h2 className=" text-white/45 text-4xl font-bold">
                    Overview
                  </h2>
                  <p className=" text-white tracking-widest leading-7">
                    {overview}
                  </p>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">Cast</h2>
                  <div className=" relative min-h-50">
                    {creditsQuery.isLoading && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex items-center justify-center text-white">
                        <ClipLoader color="white" />
                      </div>
                    )}

                    {creditsQuery.isError && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
                        <span className=" text-2xl text-center font-extralight tracking-wider">
                          {creditsQuery.error.message}
                        </span>
                        <ErrorIcon size={50} />
                      </div>
                    )}

                    {creditsQuery.isSuccess && (
                      <Swiper
                        spaceBetween={10}
                        breakpoints={{
                          400: {
                            slidesPerView: 2,
                          },
                          640: {
                            slidesPerView: 3,
                          },
                          1280: {
                            slidesPerView: 4,
                          },
                        }}
                      >
                        {creditsMap}
                      </Swiper>
                    )}
                  </div>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">Images</h2>
                  <div className=" relative min-h-50">
                    {imagesQuery.isLoading && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex items-center justify-center text-white">
                        <ClipLoader color="white" />
                      </div>
                    )}

                    {imagesQuery.isError && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
                        <span className=" text-2xl text-center font-extralight tracking-wider">
                          {imagesQuery.error.message}
                        </span>
                        <ErrorIcon size={50} />
                      </div>
                    )}

                    {imagesQuery.isSuccess && (
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
                    )}
                  </div>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">
                    Your Review
                  </h2>

                  <div className=" relative min-h-50">
                    {reviewsQuery.isLoading && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex items-center justify-center text-white">
                        <ClipLoader color="white" />
                      </div>
                    )}

                    {reviewsQuery.isError && (
                      <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
                        <span className=" text-2xl text-center font-extralight tracking-wider">
                          {reviewsQuery.error.message}
                        </span>
                        <ErrorIcon size={50} />
                      </div>
                    )}

                    {reviewsQuery.isSuccess && (
                      <>
                        <form
                          method="post"
                          className=" w-full"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <textarea
                            name=""
                            id=""
                            rows={10}
                            placeholder={`What did you think of ${title || "the masterpiece"}?`}
                            className=" border border-white w-full text-white p-5"
                          ></textarea>
                          <button className=" border w-full text-white font-semibold py-3 hover:bg-white hover:text-black duration-150 tracking-wider">
                            Submit Review
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full mt-10 px-10 space-y-10">
          <h2 className=" text-white/45 text-4xl font-bold">Reviews</h2>
          <div className=" relative min-h-25">
            {reviewsQuery.isLoading && (
              <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex items-center justify-center text-white">
                <ClipLoader color="white" />
              </div>
            )}

            {reviewsQuery.isError && (
              <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
                <span className=" text-2xl text-center font-extralight tracking-wider">
                  {reviewsQuery.error.message}
                </span>
                <ErrorIcon size={50} />
              </div>
            )}

            {reviewsQuery.isSuccess && reviewsQuery.data.length === 0 && (
              <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
                <span className=" text-2xl text-center font-extralight tracking-wider">
                  No Reviews
                </span>
              </div>
            )}

            <div className=" grid gap-x-10 gap-y-20 min-[800px]:grid-cols-2 xl:grid-cols-3">
              {reviewsMap}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
